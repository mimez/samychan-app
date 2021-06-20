import React, {useEffect, useState} from "react";
import Api from "../../utils/Api"
import {Link} from "react-router-dom";

const Stats = (props) => {

  const [stats, setStats] = useState([]);

  useEffect(() => {
    Api.getStats((data) => {
      setStats(data)
    })
  })

  return (
    <div>
      <h1>Stats</h1>
      {stats.map((item) =>
        <p>
          <Link to={"/p/" + item.hash} key={item.hash}>
            {item.filename} ({item.series}-Series)
          </Link>
        </p>
      )}
    </div>
  )
}

export default Stats