import { useState } from "react";
import { FaMoon, FaLocationDot, FaLink } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

const App = () => {
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([undefined]);
  const [light, setLight] = useState("light");
  function getUserName(e: any) {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userName}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts([data]);
      });
  }
  return (
    <div className={`main ${light === "light" ? "light" : "dark"}`}>
      <div className="navbar">
        <h1>devfinder</h1>
        {light === "light" ? (
          <span onClick={() => setLight("dark")}>
            DARK <FaMoon />
          </span>
        ) : (
          <span onClick={() => setLight("light")}>
            LIGHT <FiSun />
          </span>
        )}
      </div>
      <form className="form" onSubmit={getUserName}>
        <CiSearch />
        <input
          type="text"
          placeholder="Search GitHub username…"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button>Search</button>
      </form>
      {posts[0]!=undefined ? (
        posts.map((post: any) => (
          <div className="asos" key={post}>
            <div className="header">
              <img
                src={post.avatar_url ? post.avatar_url : "/Bitmap (4).svg"}
                alt=""
                style={{width: "130px"}}
              />
              <div style={{marginLeft: "0px"}}>
                <h2>{post.name ? post.name : "No name"}</h2>
                <a href="https://github.com/danielmiessler/fabric">@{post.name ? post.name : "No name"}</a>
                <p style={{width: "400px"}}>{post.bio && post.bio.slice(0,60)}...</p>
              </div>
              <p className="alohida">Joined {post.created_at && post.created_at.slice(0,7)}</p>
            </div>
            <div className="count_1">
              <div className="count">
                <div>
                  <span>Repos</span>
                  <h2>{post.public_repos}</h2>
                </div>
                <div>
                  <span>Followers</span>
                  <h2>{post.followers}</h2>
                </div>
                <div>
                  <span>Following</span>
                  <h2>{post.following}</h2>
                </div>
              </div>
            </div>
            <div className="links_1">
              <div className="links">
                <div>
                  <span>
                    <FaLocationDot className="icon" /> {post.location?post.location : "No location"}
                  </span>
                  <span>
                    <FaLink className="icon" /> https://github.blog
                  </span>
                </div>
                <div>
                  <span>
                    <FaTwitter className="icon" /> {post.twitter_username ? post.twitter_username : "No twitter username"}
                  </span>
                  <span>
                    <MdApartment className="icon" /> @github
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="asos">
          <div className="header">
            <img src="/Bitmap (4).svg" alt="" />
            <div>
              <h2>The Octocat </h2>
              <a href="#">@octocat</a>
              <p>This profile has no bio</p>
            </div>
            <p className="alohida">Joined 25 Jan 2011</p>
          </div>
          <div className="count_1">
            <div className="count">
              <div>
                <span>Repos</span>
                <h2>8</h2>
              </div>
              <div>
                <span>Followers</span>
                <h2>3938</h2>
              </div>
              <div>
                <span>Following</span>
                <h2>9</h2>
              </div>
            </div>
          </div>
          <div className="links_1">
            <div className="links">
              <div>
                <span>
                  <FaLocationDot className="icon" /> San Francisco
                </span>
                <span>
                  <FaLink className="icon" /> https://github.blog
                </span>
              </div>
              <div>
                <span>
                  <FaTwitter className="icon" /> Not Available
                </span>
                <span>
                  <MdApartment className="icon" /> @github
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
