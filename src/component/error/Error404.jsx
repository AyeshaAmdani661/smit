import { color } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <div>
        <div className="row py-5 text-center">
          <div className="col-md-6 py-5 mx-auto">
            <h1 className="text-primary"style={{fontSize:"200px"}}>404</h1>
            <p className="text-secondary"style={{fontSize:"50px"}}>Page not found</p>
            <Link to={"/"}>
              <button type="button" class="btn btn-primary text-light">Back to home</button>
              </Link>
          </div>
        </div>
    </div>
  )
}

