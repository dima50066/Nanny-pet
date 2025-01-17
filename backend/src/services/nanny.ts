import { NanniesCollection } from "../db/models/nanny";
import { Nanny } from "../db/models/nanny";
import createHttpError from "http-errors";

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
    page = 1,
    limit = 3,
    priceRange,
    rating,
  } = query;

  const filter: any = {};

  // Фільтрація за ціною
  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filter.price_per_hour = { $gte: min, $lte: max };
  }

  // Фільтрація за рейтингом
  if (rating) {
    filter.rating = { $gte: Number(rating) };
  }

  // Сортування
  const sort: any = { [sortBy]: order === "asc" ? 1 : -1 };

  // Пагінація
  const skip = (Number(page) - 1) * Number(limit);

  // Отримання даних із бази
  const nannies = await NanniesCollection.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  // Загальна кількість для пагінації
  const totalCount = await NanniesCollection.countDocuments(filter);

  return { nannies, totalCount };
};
