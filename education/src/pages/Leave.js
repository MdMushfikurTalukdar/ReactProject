import React from 'react'
import "./Leave.css"
import star from "../components/img/star.png"


export const Leave = () => {
  return (
    <>
        <div className='body'>
            <div className='side'>
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
              <img className='icon' src={star} />
            </div>
            <div className='main'>
              <div className='header'>
                <svg className='csvg' viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <path className='cpath' id="curve" d="M 100,250 A 150,150 0 0,1 400,250" />
                  <text className='ctext' width="500">
                      <textPath href="#curve">
                          MOTIHARI COLLEGE OF ENGINEERING, MOTIHARI
                      </textPath>
                  </text>
                </svg>
              </div>
              <div className='text2'>
                <p>(Department of Science & </p>
                <p>Technology, Bihar)</p>
              </div>
              <div className='text3'>
                <p>Transfer / Leaving Certificate</p>
              </div>
              <div className='textDate'>
                <span className='sl'>Sl. No.</span><span className='date'>Date........................</span>
              </div>
              
            </div>
        </div>
    </>
  )
}

export default Leave
