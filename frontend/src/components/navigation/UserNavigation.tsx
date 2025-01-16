const UserNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/nannies">Nannies</a>
        </li>
        <li>
          <a href="/favorites">Favorites</a>
        </li>
        <li>
          <button onClick={() => console.log("Logout")}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavigation;
