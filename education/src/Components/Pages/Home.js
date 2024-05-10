import React from 'react'
import './Home.css';
import img1 from '../Img/img2.jpeg';
import img3 from '../Img/img3.png';
import sport from '../Img/sports.jpeg';
import club from '../Img/club.jpeg';
import student from '../Img/studen.jpg';


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
      <div className='second-second'>
        <h4><span className='redColor' >W</span>e Are Creative And Awesome</h4>
        <h6><span className='redColor' >L</span>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.Lorem Ipsum is simply dummy text of the printing and typesetting industry. book.</h6>
      </div>
      <div className='second-third'>
        <img src={img3}/>
      </div>
    </div>
    <div className='third'>
      <div className='third-first'>
        <h2>Our Campus</h2>
        <p className='underline2'>___________________</p>
      </div>
      <div className='third-second'>
        <div className='third-second-first'>
          <img className='imgSport' src={sport} />
          <h4 className='sportTxt'>Sports</h4>
        </div>
        <div className='third-second-second'>
          <img className='imgSport' src={club} />
          <h4 className='sportTxt'>Club</h4>
        </div>
        <div className='third-second-third'>
          <img className='imgSport' src={student} />
          <h4 className='sportTxt'>Life Style</h4>
        </div>
        <div className='third-second-fourth'>
          <button className='btnExplore'>Explore More</button>
        </div>
      </div>
    </div>
    <div className='fourth'>
      <h1>Footer</h1>
    </div>
    </>
  )
}