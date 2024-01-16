import React, {useState} from 'react'

function ProgramCard({progName, lastModified, imgUrl}) {
  const date = new Date(lastModified)
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedDate = dd + '/' + mm + '/' + yyyy;

  return (
    <div className='border rounded-lg p-4 flex gap-4 hover:bg-slate-500'>

      <div>
        {/* 'src' can be imgUrl of the Program */}
        <img className='rounded-full h-10 w-10' src="https://malignep.transilien.com/wp-content/themes/transilien2021-P/img/ligne.svg" alt="program_icon"/>
      </div>

      <div>
        <h1>{progName}</h1>
        <h1>Last Modified: {formattedDate}</h1>
      </div>
    </div>
  )
}

export default ProgramCard
