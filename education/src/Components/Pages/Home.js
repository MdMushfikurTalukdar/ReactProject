import React from 'react'
import './Home.css';
import img1 from '../Img/img2.jpeg';

export default function Home() {
  return (
    <>
    <div className='body'>
      <div className='banner'>
        <img src={img1} ></img>
        <div className='overlay'> 
          <h1 className='welcomeTxt'>Welcome to Our Edicuation Platform </h1> 
          <div>
            <a><button className='getBtn'>Get Start</button></a>
            
          </div>
        
        </div>
        
      </div>
    </div>
    <div className='second'>
      <div >
        <h1 className='aboutTxt'>
          About <span className='redColor'>US</span>
        </h1>
        <p className='underline'>___________________</p>
      </div>
      <div className='txtDiv'>
        <h6 className='txtAbout'><spam className='redColor' >L</spam>orem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut et dolore magna aliqua. Ut enim ad minim veniam</h6>
      </div>
    </div>
    </>
  )
}