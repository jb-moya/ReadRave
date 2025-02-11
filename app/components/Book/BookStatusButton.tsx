'use client'
import React from 'react'
import {
    BsBookmarkPlus,
    BsCheck2Circle,
    BsXCircle,
    BsTrash,
    BsBook,
} from "react-icons/bs";

const BookStatusButton = () => {
  return (
      <div className="dropdown dropdown-hover dropdown-end rounded-none">
          <div
              tabIndex={0}
              role="button"
              className="btn"
          >
              <BsBookmarkPlus /> Want to Read
          </div>
          
          <ul
              tabIndex={0}
              className="dropdown-content menu"
          >
              <li>
                  <a>
                      <BsBook /> Currently Reading
                  </a>
              </li>
              <li>
                  <a>
                      <BsBookmarkPlus /> Want to Read
                  </a>
              </li>
              <li>
                  <a>
                      <BsCheck2Circle /> Finished
                  </a>
              </li>
              <li>
                  <a>
                      <BsXCircle /> Abandoned
                  </a>
              </li>
              <li>
                  <a>
                      <BsTrash /> Unmark
                  </a>
              </li>
          </ul>
      </div>
  );
}

export default BookStatusButton