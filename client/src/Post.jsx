import React from "react"

function Post() {
  return (
    <div className="post">
      <div className="image">
        <img src="https://laspppa.lagosstate.gov.ng/wp-content/uploads/sites/183/2023/05/IMG-20230510-WA0012-768x576.jpg" />
      </div>
      <div className="texts">
        <h2>LASPPPA has sealed properties </h2>
        <p className="info">
          <a className="author">Akorede Odunsi</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">
          sealed properties within Ikeja and Ojokoro district that contravened
          Lagos State Physical Planning Law.
        </p>
      </div>
    </div>
  )
}

export default Post
