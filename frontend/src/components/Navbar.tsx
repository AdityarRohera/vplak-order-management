
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// path "" = page not built yet
const menu = [
  { label: "PRODUCT", path: "/products" },
  { label: "BRAND", path: "" },
  { label: "CATEGORY", path: "" },
  { label: "BRAND CATEGORY", path: "" },
  { label: "ORDER'S PANEL", path: "/orders" },
  { label: "BAR CHART", path: "" },
  { label: "BUYING GUIDE", path: "" },
  { label: "EXCEL", path: "" },
  { label: "SEO TEXT", path: "" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center gap-6 bg-slate-800 px-6">
      <span className="text-xl font-bold text-white">
        VPLAK
      </span>

      <div className="flex flex-1 items-center gap-1">
        {menu.map((item) => {
          const isActive =
            item.path !== "" &&
            location.pathname.startsWith(item.path);

          return (
            <button
              key={item.label}
              type="button"
              onClick={() =>
                item.path && navigate(item.path)
              }
              className={
                isActive
                  ? "border-b-2 border-teal-400 px-3 py-4 text-sm font-medium text-white"
                  : "border-b-2 border-transparent px-3 py-4 text-sm text-gray-300 hover:text-white"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-bold text-white"
      >
        LOGOUT
      </button>
    </nav>
  );
};

export default Navbar;
