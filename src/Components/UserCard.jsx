import React from 'react'

const UserCard = (feedUser) => {
    const {firstName, lastName, about}= feedUser?.feedUser    
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={feedUser.photoUrl}
      alt="User" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-warning">Ignore</button>
      <button className="btn btn-success">Interested</button>
    </div>
  </div>
</div>
  );
}

export default UserCard
