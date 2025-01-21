import { NanniesCollection } from "../db/models/nanny";
import { Nanny } from "../db/models/nanny";
import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user";

export const createNannyProfile = async (payload: Nanny) => {
  const existingNanny = await NanniesCollection.findOne({
    userId: payload.userId,
  });
  if (existingNanny) {
    throw createHttpError(400, "User already has a nanny profile");
  }

  return await NanniesCollection.create(payload);
};

export const getNannyProfileByUserId = async (userId: string) => {
  const nanny = await NanniesCollection.findOne({ userId });
  if (!nanny) {
    throw createHttpError(404, "Nanny profile not found");
  }
  return nanny;
};

export const updateNannyProfile = async (
  userId: string,
  updates: Partial<Nanny>
) => {
  const nanny = await NanniesCollection.findOneAndUpdate({ userId }, updates, {
    new: true,
  });
  if (!nanny) {
    throw createHttpError(404, "Nanny profile not found");
  }
  return nanny;
};

export const deleteNannyProfile = async (userId: string) => {
  const result = await NanniesCollection.deleteOne({ userId });
  if (!result.deletedCount) {
    throw createHttpError(404, "Nanny profile not found");
  }
};

export const getFilteredNannies = async (query: any) => {
  const {
    sortBy = "name",
    order = "asc",
    page = 0,
    limit = 3,
    priceRange,
    rating,
  } = query;

  const filter: any = {};

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filter.price_per_hour = { $gte: min, $lte: max };
  }

  if (rating) {
    filter.rating = { $gte: Number(rating) };
  }

  const sort: any = { [sortBy]: order === "asc" ? 1 : -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const nannies = await NanniesCollection.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const totalCount = await NanniesCollection.countDocuments(filter);

  return { nannies, totalCount };
};

export const getFilteredFavorites = async (userId: string, query: any) => {
  const {
    sortBy = "name",
    order = "asc",
    page = 0,
    limit = 3,
    priceRange,
    rating,
  } = query;

  const user = await UsersCollection.findById(userId).populate("favorites");
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const favorites = user.favorites as Nanny[];

  let filtered = favorites;

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter(
      (nanny) => nanny.price_per_hour >= min && nanny.price_per_hour <= max
    );
  }

  if (rating) {
    filtered = filtered.filter((nanny) => nanny.rating >= Number(rating));
  }

  filtered.sort((a, b) => {
    const valueA = a[sortBy as keyof Nanny];
    const valueB = b[sortBy as keyof Nanny];
    if (order === "asc") {
      return valueA > valueB ? 1 : -1;
    }
    return valueA < valueB ? 1 : -1;
  });

  const totalCount = filtered.length;
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);

  const paginatedFavorites = filtered.slice(start, end);

  return { favorites: paginatedFavorites, totalCount };
};
