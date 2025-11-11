"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  RefreshCw,
  AlertTriangle,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./SocialMediaAnalysis.css";

const SocialMediaAnalysis = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/social-media/posts",
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
          // Add timestamp to prevent caching
          params: {
            _t: new Date().getTime(),
          },
        }
      );
      console.log("Full API response:", response.data);

      // The server returns { posts: [...], currentPage: 1, ... }
      // So we need to access response.data.posts
      const postsData = response.data.posts || response.data;
      console.log("Posts data:", postsData);

      // Ensure we always set an array
      setPosts(Array.isArray(postsData) ? postsData : []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error("Error fetching posts:", err);
      setPosts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFloodLabelText = (label) => {
    return label === 1 ? "Flood Related" : "Not Flood Related";
  };

  const getFloodLabelClass = (label) => {
    return label === 1 ? "flood-related" : "not-flood-related";
  };

  // Ensure posts is always an array before filtering
  const filteredPosts = Array.isArray(posts)
    ? posts.filter((post) => {
        if (!post) return false; // Guard against null/undefined posts

        const matchesSearch =
          (post.text &&
            post.text.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.subreddit &&
            post.subreddit.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filter === "all") return matchesSearch;
        if (filter === "flood") return matchesSearch && post.flood_label === 1;
        if (filter === "non-flood")
          return matchesSearch && post.flood_label === 0;

        return matchesSearch;
      })
    : [];

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  console.log("[v0] Pagination Debug:", {
    totalPosts: posts.length,
    filteredPosts: filteredPosts.length,
    currentPage,
    postsPerPage,
    totalPages,
    currentPostsCount: currentPosts.length,
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRefresh = () => {
    fetchPosts();
    setCurrentPage(1);
  };

  // Safe counting functions
  const getTotalPosts = () => (Array.isArray(posts) ? posts.length : 0);
  const getFloodPosts = () =>
    Array.isArray(posts)
      ? posts.filter((p) => p && p.flood_label === 1).length
      : 0;
  const getNonFloodPosts = () =>
    Array.isArray(posts)
      ? posts.filter((p) => p && p.flood_label === 0).length
      : 0;

  if (loading) {
    return (
      <div className="social-media-analysis-container">
        <div className="social-media-analysis-loading-spinner">
          <div className="social-media-analysis-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="social-media-analysis-container">
      <div className="social-media-analysis-header">
        <h1>Social Media Analysis</h1>
        <p>Analyzing flood-related posts from social media platforms</p>
      </div>

      {error && (
        <div className="social-media-analysis-error-message">
          <AlertTriangle
            className="social-media-analysis-error-icon"
            size={20}
          />
          {error}
          <button
            onClick={handleRefresh}
            className="social-media-analysis-retry-btn"
          >
            Retry
          </button>
        </div>
      )}

      <div className="social-media-analysis-controls-section">
        <div className="social-media-analysis-search-filter-container">
          <div className="social-media-analysis-search-box">
            <input
              type="text"
              placeholder="Search posts or subreddits..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="social-media-analysis-search-input"
            />
            <Search className="social-media-analysis-search-icon" size={18} />
          </div>

          <div className="social-media-analysis-filter-buttons">
            <button
              onClick={() => {
                setFilter("all");
                setCurrentPage(1);
              }}
              className={`social-media-analysis-filter-btn ${
                filter === "all" ? "social-media-analysis-active" : ""
              }`}
            >
              All Posts ({getTotalPosts()})
            </button>
            <button
              onClick={() => {
                setFilter("flood");
                setCurrentPage(1);
              }}
              className={`social-media-analysis-filter-btn ${
                filter === "flood" ? "social-media-analysis-active" : ""
              }`}
            >
              Flood Related ({getFloodPosts()})
            </button>
            <button
              onClick={() => {
                setFilter("non-flood");
                setCurrentPage(1);
              }}
              className={`social-media-analysis-filter-btn ${
                filter === "non-flood" ? "social-media-analysis-active" : ""
              }`}
            >
              Non-Flood ({getNonFloodPosts()})
            </button>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="social-media-analysis-refresh-btn"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      <div className="social-media-analysis-posts-grid">
        {currentPosts.length === 0 ? (
          <div className="social-media-analysis-no-posts">
            <h3>No posts found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          currentPosts.map((post) => (
            <div
              key={post._id || Math.random()}
              className="social-media-analysis-post-card"
            >
              <div className="social-media-analysis-post-header">
                <div className="social-media-analysis-subreddit-info">
                  <span className="social-media-analysis-subreddit-name">
                    r/{post.subreddit || "unknown"}
                  </span>
                  <span className="social-media-analysis-post-date">
                    {formatDate(post.date)}
                  </span>
                </div>
                <div
                  className={`social-media-analysis-flood-label ${getFloodLabelClass(
                    post.flood_label
                  )}`}
                >
                  {getFloodLabelText(post.flood_label)}
                </div>
              </div>

              <div className="social-media-analysis-post-content">
                <p className="social-media-analysis-post-text">
                  {post.text || "No content available"}
                </p>
              </div>

              <div className="social-media-analysis-post-footer">
                <div className="social-media-analysis-location-info">
                  <span className="social-media-analysis-coordinates">
                    <MapPin
                      size={16}
                      className="social-media-analysis-location-icon"
                    />
                    {post.lat ? post.lat.toFixed(4) : "0.0000"},{" "}
                    {post.lon ? post.lon.toFixed(4) : "0.0000"}
                  </span>
                </div>
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-media-analysis-source-link"
                  >
                    <ExternalLink size={16} />
                    View Source
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {filteredPosts.length > postsPerPage && (
        <div className="social-media-analysis-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="social-media-analysis-pagination-btn"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <div className="social-media-analysis-pagination-numbers">
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`social-media-analysis-pagination-number ${
                    currentPage === pageNumber
                      ? "social-media-analysis-active"
                      : ""
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="social-media-analysis-pagination-btn"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <div className="social-media-analysis-results-info">
        Showing page {currentPage} of {totalPages} ({filteredPosts.length} total
        posts)
      </div>
    </div>
  );
};

export default SocialMediaAnalysis;
