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
              <div className='allText'>
                <p>1. Pupil's Name</p>
                <p>2. Father's Name-</p>
                <p>3. Residence-</p>
                <p>4. Date of admission-</p>
                <p>5 Number of in adm. Register-</p>
                <p>6. Date of Birth as recorded in the Adm. Reg.-</p>
                <p>7. Date on wich he left the institute-</p>
                <p>8. Class in wich he was then reading-</p>
                <p>9. (To be filled up when the pupil leaves at the end of the session) whether he has passed the examination for promotion to the next higher class- </p>
                <p>10 (To be filled up when the pupil leaves during the session) attendance during the current years-</p>
              </div>
              <div className='allTextTable'>
                <table>
                  <tr>
                    <th>Date of admission</th>
                    <th>Date of Leaving</th>
                  </tr>
                  <tr>
                    <td>IN THIS INSTITUTE</td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div className='allText2'>
                <p>11. Character-</p>
                <p>12. Reason for leaving-</p>
                <p>13. Issuing clerk-</p>
                <p>14. Date of Issue-</p>
              </div>
              <div className='principal'>
                <p>Principal/O.S.D.</p>
              </div>
              
            </div>
        </div>
    </>
  )
}

export default Leave
