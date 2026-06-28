import  { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote ,handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  };
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 drop-shadow-lg">
      <h2 className="text-2xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClearSearch={onClearSearch}
        handleSearch={handleSearch}
      />
      
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
