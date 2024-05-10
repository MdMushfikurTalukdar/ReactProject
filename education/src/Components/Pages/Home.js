import React from "react";
import { Link } from "react-router-dom";
import './style.css';
import './responsive.css';
import './bootstrap.css';
import './style.scss';
import img1 from './Img/about-img.jpg';
import none from './Img/about-img.jpg';

const Home = () => {
  return (
    <>
    <div className="hero_area">
  
    <section className=" slider_section position-relative">
      <div className="container">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="/carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="/carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="/carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="/carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="/carouselExampleIndicators" data-slide-to="4"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      A Perfect Learning Center <br />
                      <span>
                        For Your Kids
                      </span>
                    </h1>
                    <p>
                      It is a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum is that it has a more-or-less
                      normal distribution of letters, as
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        Read More
                      </a>
                      <a href="" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      A Perfect Learning Center <br />
                      <span>
                        For Your Kids
                      </span>
                    </h1>
                    <p>
                      It is a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum is that it has a more-or-less
                      normal distribution of letters, as
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        Read More
                      </a>
                      <a href="" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      A Perfect Learning Center <br />
                      <span>
                        For Your Kids
                      </span>
                    </h1>
                    <p>
                      It is a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum is that it has a more-or-less
                      normal distribution of letters, as
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        Read More
                      </a>
                      <a href="" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      A Perfect Learning Center <br />
                      <span>
                        For Your Kids
                      </span>
                    </h1>
                    <p>
                      It is a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum is that it has a more-or-less
                      normal distribution of letters, as
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        Read More
                      </a>
                      <a href="" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      A Perfect Learning Center <br />
                      <span>
                        For Your Kids
                      </span>
                    </h1>
                    <p>
                      It is a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum is that it has a more-or-less
                      normal distribution of letters, as
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        Read More
                      </a>
                      <a href="" className="btn-2">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>

 

  <section className="offer_section hero_next_section-margin layout_padding">
    <div className="container">
      <div className="heading_container">
        <h2>
          what we offer
        </h2>
        <p>
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout. The point
          of using Lorem
        </p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="content-box">
            <div className="img-box">
              <svg xmlns="http://www.w3.org/2000/svg" height="512pt" version="1.1" viewBox="-38 0 512 512.00142" width="512pt">
                <g id="surface1">
                  <path d="M 435.488281 138.917969 L 435.472656 138.519531 C 435.25 133.601562 435.101562 128.398438 435.011719 122.609375 C 434.59375 94.378906 412.152344 71.027344 383.917969 69.449219 C 325.050781 66.164062 279.511719 46.96875 240.601562 9.042969 L 240.269531 8.726562 C 227.578125 -2.910156 208.433594 -2.910156 195.738281 8.726562 L 195.40625 9.042969 C 156.496094 46.96875 110.957031 66.164062 52.089844 69.453125 C 23.859375 71.027344 1.414062 94.378906 0.996094 122.613281 C 0.910156 128.363281 0.757812 133.566406 0.535156 138.519531 L 0.511719 139.445312 C -0.632812 199.472656 -2.054688 274.179688 22.9375 341.988281 C 36.679688 379.277344 57.492188 411.691406 84.792969 438.335938 C 115.886719 468.679688 156.613281 492.769531 205.839844 509.933594 C 207.441406 510.492188 209.105469 510.945312 210.800781 511.285156 C 213.191406 511.761719 215.597656 512 218.003906 512 C 220.410156 512 222.820312 511.761719 225.207031 511.285156 C 226.902344 510.945312 228.578125 510.488281 230.1875 509.925781 C 279.355469 492.730469 320.039062 468.628906 351.105469 438.289062 C 378.394531 411.636719 399.207031 379.214844 412.960938 341.917969 C 438.046875 273.90625 436.628906 199.058594 435.488281 138.917969 Z M 384.773438 331.523438 C 358.414062 402.992188 304.605469 452.074219 220.273438 481.566406 C 219.972656 481.667969 219.652344 481.757812 219.320312 481.824219 C 218.449219 481.996094 217.5625 481.996094 216.679688 481.820312 C 216.351562 481.753906 216.03125 481.667969 215.734375 481.566406 C 131.3125 452.128906 77.46875 403.074219 51.128906 331.601562 C 28.09375 269.097656 29.398438 200.519531 30.550781 140.019531 L 30.558594 139.683594 C 30.792969 134.484375 30.949219 129.039062 31.035156 123.054688 C 31.222656 110.519531 41.207031 100.148438 53.765625 99.449219 C 87.078125 97.589844 116.34375 91.152344 143.234375 79.769531 C 170.089844 68.402344 193.941406 52.378906 216.144531 30.785156 C 217.273438 29.832031 218.738281 29.828125 219.863281 30.785156 C 242.070312 52.378906 265.921875 68.402344 292.773438 79.769531 C 319.664062 91.152344 348.929688 97.589844 382.246094 99.449219 C 394.804688 100.148438 404.789062 110.519531 404.972656 123.058594 C 405.0625 129.074219 405.21875 134.519531 405.453125 139.683594 C 406.601562 200.253906 407.875 268.886719 384.773438 331.523438 Z M 384.773438 331.523438 " style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" />
                  <path d="M 217.996094 128.410156 C 147.636719 128.410156 90.398438 185.652344 90.398438 256.007812 C 90.398438 326.367188 147.636719 383.609375 217.996094 383.609375 C 288.351562 383.609375 345.59375 326.367188 345.59375 256.007812 C 345.59375 185.652344 288.351562 128.410156 217.996094 128.410156 Z M 217.996094 353.5625 C 164.203125 353.5625 120.441406 309.800781 120.441406 256.007812 C 120.441406 202.214844 164.203125 158.453125 217.996094 158.453125 C 271.785156 158.453125 315.546875 202.214844 315.546875 256.007812 C 315.546875 309.800781 271.785156 353.5625 217.996094 353.5625 Z M 217.996094 353.5625 " style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" />
                  <path d="M 254.667969 216.394531 L 195.402344 275.660156 L 179.316406 259.574219 C 173.449219 253.707031 163.9375 253.707031 158.070312 259.574219 C 152.207031 265.441406 152.207031 274.953125 158.070312 280.816406 L 184.78125 307.527344 C 187.714844 310.460938 191.558594 311.925781 195.402344 311.925781 C 199.246094 311.925781 203.089844 310.460938 206.023438 307.527344 L 275.914062 237.636719 C 281.777344 231.769531 281.777344 222.257812 275.914062 216.394531 C 270.046875 210.523438 260.535156 210.523438 254.667969 216.394531 Z M 254.667969 216.394531 " style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" />
                </g>
              </svg>
            </div>
            <div className="detail-box">
              <h6>
                safety first
              </h6>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-box">
            <div className="img-box">
              

            </div>
            <div className="detail-box">
              <h6>
                small class Size
              </h6>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-box">
            <div className="img-box">
              
            </div>
            <div className="detail-box">
              <h6>
                infant care
              </h6>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-box">
            <div className="img-box">
              
            </div>
            <div className="detail-box">
              <h6>
                cretive lessons
              </h6>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-box">
            <div className="img-box">
              <svg height="512" viewBox="0 0 44 60" width="512" xmlns="http://www.w3.org/2000/svg">
                <g id="007---Vegan-Certified">
                  <path id="Shape" d="m2.51 27.21c.41 1.53-.65 3.91.44 5.78s3.73 2.2 4.78 3.26c.66341509.9402255 1.22965215 1.94538 1.69 3l-5.3 15.47c-.24986143.8046502.03135368 1.6795957.70323859 2.1879887.6718849.5083929 1.59032712.541188 2.29676141.0820113l3.32-2.35 1.17 3.89c.2470407.8346382 1.0055339 1.4136582 1.8757731 1.4319309s1.652369-.5283981 1.9342269-1.3519309l5.18-14.91c.894629.3801265 1.905371.3801265 2.8 0l5.14 14.95c.2818579.8235328 1.0639877 1.3702036 1.9342269 1.3519309s1.6287324-.5972927 1.8757731-1.4319309l1.17-3.89 3.32 2.32c.7064343.4591767 1.6248765.4263816 2.2967614-.0820113.6718849-.508393.9531-1.3833385.7032386-2.1879887l-5.26-15.44c.4621021-1.0517589 1.0247145-2.0564238 1.68-3 1.09-1.12 3.74-1.42 4.79-3.29s.05-4.3.44-5.78 2.51-3.03 2.51-5.22-2.14-3.82-2.51-5.22.65-3.91-.44-5.78-3.73-2.2-4.78-3.26-1.38-3.74-3.27-4.8-4.3 0-5.78-.43-3.02-2.51-5.22-2.51-3.81 2.13-5.22 2.51c-1.56.41-3.9-.66-5.78.43s-2.19 3.72-3.26 4.79-3.74 1.38-4.74 3.27 0 4.3-.44 5.78-2.56 3.01-2.56 5.22 2.13 3.79 2.51 5.21zm11.06 30.79-1.17-3.91c-.1976033-.6096465-.6753934-1.0876735-1.2849419-1.2855789-.6095485-.1979053-1.27701924-.0917163-1.7950581.2855789l-3.32 2.32c5.36-15.61 4.9-14.41 5-14.41 1.84 1.07 4.3 0 5.78.43.7212439.3095798 1.3946823.7203773 2 1.22zm21.11-5c-.5317197-.3750147-1.2126328-.4679309-1.8253891-.2490894-.6127563.2188416-1.0807556.7220836-1.2546109 1.3490894l-1.17 3.9-5.26-15.31c.6003733-.5039265 1.2749967-.9120736 2-1.21 1.57-.42 3.9.65 5.78-.44.1-.06-.35-1.22 5 14.36zm-31.56-33.3c1.43-2 1.63-2.66 1.4-5.25s-.09-2.77 2.24-3.84 2.79-1.54 3.85-3.86 1.39-2.46 3.85-2.23 3.23 0 5.25-1.4 2.47-1.49 4.58 0 2.71 1.62 5.25 1.4 2.78-.09 3.85 2.23 1.55 2.79 3.85 3.86 2.47 1.34 2.24 3.84 0 3.24 1.4 5.25 1.49 2.47 0 4.58-1.63 2.66-1.4 5.25.09 2.77-2.24 3.85-2.78 1.53-3.85 3.85-1.34 2.46-3.85 2.24-3.23 0-5.25 1.39-2.47 1.49-4.58 0c-1.0423154-.9426353-2.3946995-1.4693533-3.8-1.48-1.44 0-3.07.41-3.91-.07-1.15-.67-1.46-3.09-2.85-4.47s-3.82-1.72-4.47-2.84.27-3.4-.24-5.29-2.44-3.38-2.44-4.71c.15146417-.856136.53941752-1.6528259 1.12-2.3z" />
                  <path id="Shape" d="m22 37c8.2842712 0 15-6.7157288 15-15s-6.7157288-15-15-15-15 6.7157288-15 15 6.7157288 15 15 15zm0-28c7.1797017 0 13 5.8202983 13 13s-5.8202983 13-13 13-13-5.8202983-13-13c0-3.4478144 1.3696389-6.7544152 3.8076118-9.1923882 2.437973-2.4379729 5.7445738-3.8076118 9.1923882-3.8076118z" />
                  <path id="Shape" d="m15.05 25.23c.5326668-.0266663.9506671-.4666665.95-1-.04701-1.7723836.6491214-3.4837067 1.92-4.72 1.51-1.5 3.29-1.9 5.48-2.27 1.5112798-.2598751 2.9558943-.8173263 4.25-1.64 1.3 5-1.07 11.2-6 12.84-1.1557039.3803653-2.3633585.5793921-3.58.59 1.4512518-2.7056317 3.503907-5.0422376 6-6.83.2152922-.1561269.3595264-.3915809.400811-.6543011.0412846-.2627203-.0237813-.5310643-.180811-.7456989-.3245963-.4421183-.9447379-.5402702-1.39-.22-3.2408451 2.2460799-5.7761199 5.3674853-7.31 9-.1029087.2892167-.0672774.6096747.0966476.8692226.1639249.2595479.4379782.4294236.7433524.4607774 5.23.56 9.93-1.56 12.26-6.6 1.5594824-3.3648605 1.7106785-7.2131594.42-10.69-.1144927-.2847517-.3534014-.5011592-.6480543-.5870183-.2946529-.0858592-.6124138-.0316601-.8619457.1470183-1.3294676 1.0397446-2.8903874 1.7430162-4.55 2.05-2.45.41-4.63.91-6.56 2.82-1.6608428 1.6355323-2.5634345 3.8901991-2.49 6.22.0103478.2671046.1272025.5189482.3244812.6993174.1972788.1803692.4585583.2742482.7255188.2606826z" />
                </g>
              </svg>
            </div>
            <div className="detail-box">
              <h6>
                certified teachers
              </h6>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-box">
            <div className="img-box">
              <svg height="496pt" viewBox="-24 0 496 496" width="496pt" xmlns="http://www.w3.org/2000/svg">
                <path d="m416 80c-17.648438 0-32 14.351562-32 32v101.230469l-16.65625 21.195312c-2.511719-10.554687-12.023438-18.425781-23.34375-18.425781h-1.046875c-6.632813 0-13.023437 2.785156-17.546875 7.625l-98.644531 105.695312c-1.042969 1.113282-1.867188 2.367188-2.761719 3.574219-.894531-1.207031-1.71875-2.460937-2.761719-3.574219l-98.644531-105.695312c-4.523438-4.839844-10.914062-7.625-17.546875-7.625h-1.046875c-11.320312 0-20.832031 7.871094-23.34375 18.433594l-16.65625-21.203125v-101.230469c0-17.648438-14.351562-32-32-32s-32 14.351562-32 32v136c0 1.335938.335938 2.65625.976562 3.832031l48 88c.367188.664063.832032 1.289063 1.367188 1.824219l62.632812 62.632812c4.464844 4.464844 7.023438 10.648438 7.023438 16.96875v66.742188c0 4.414062 3.585938 8 8 8h192c4.414062 0 8-3.585938 8-8v-66.742188c0-6.320312 2.558594-12.496093 7.023438-16.96875l62.632812-62.632812c.535156-.535156 1-1.160156 1.367188-1.824219l48-88c.640624-1.175781.976562-2.496093.976562-3.832031v-136c0-17.648438-14.351562-32-32-32zm-291.710938 312.976562-61.816406-61.816406-46.472656-85.199218v-133.960938c0-8.824219 7.175781-16 16-16s16 7.175781 16 16v104c0 1.792969.601562 3.527344 1.710938 4.945312l88 112 12.578124-9.882812-54.289062-69.101562v-13.960938c0-4.40625 3.59375-8 8-8h1.046875c2.210937 0 4.335937.929688 5.847656 2.535156l98.65625 105.695313c4.152344 4.464843 6.449219 10.28125 6.449219 16.386719v91.382812h-80v-26.742188c0-10.691406-4.160156-20.730468-11.710938-28.28125zm11.710938 71.023438h80v16h-80zm96 16v-16h80v16zm200-234.039062-46.472656 85.191406-61.816406 61.816406c-7.550782 7.558594-11.710938 17.597656-11.710938 28.289062v26.742188h-80v-91.382812c0-6.105469 2.296875-11.921876 6.457031-16.378907l98.65625-105.695312c1.503907-1.613281 3.628907-2.542969 5.839844-2.542969h1.046875c4.40625 0 8 3.59375 8 8v13.960938l-54.289062 69.09375 12.578124 9.882812 88-112c1.109376-1.410156 1.710938-3.144531 1.710938-4.9375v-104c0-8.824219 7.175781-16 16-16s16 7.175781 16 16zm0 0" />
                <path d="m224 256c70.574219 0 128-57.425781 128-128s-57.425781-128-128-128-128 57.425781-128 128 57.425781 128 128 128zm0-16c-58.121094 0-106.015625-44.511719-111.457031-101.230469l18.769531-18.769531h12.6875c2.121094 0 4.160156-.839844 5.65625-2.34375l13.65625-13.65625h12.6875c2.121094 0 4.160156-.839844 5.65625-2.34375l32-32c1.503906-1.496094 2.34375-3.535156 2.34375-5.65625v-12.6875l13.65625-13.65625c1.503906-1.496094 2.34375-3.535156 2.34375-5.65625v-15.59375c14.238281 1.019531 27.71875 4.699219 40 10.554688v17.726562l-13.65625 13.65625c-1.503906 1.496094-2.34375 3.535156-2.34375 5.65625v12.6875l-13.65625 13.65625c-1.503906 1.496094-2.34375 3.535156-2.34375 5.65625v16c0 2.121094.839844 4.160156 2.34375 5.65625l13.65625 13.65625v12.6875c0 2.121094.839844 4.160156 2.34375 5.65625l16 16c1.496094 1.503906 3.535156 2.34375 5.65625 2.34375h12.6875l23.480469 23.480469c-20.222657 29.273437-53.976563 48.519531-92.167969 48.519531zm112-112c0 17.648438-4.214844 34.296875-11.519531 49.167969l-22.824219-22.824219c-1.496094-1.503906-3.535156-2.34375-5.65625-2.34375h-12.6875l-11.3125-11.3125v-12.6875c0-2.121094-.839844-4.160156-2.34375-5.65625l-13.65625-13.65625v-9.375l13.65625-13.65625c1.503906-1.496094 2.34375-3.535156 2.34375-5.65625v-12.6875l13.65625-13.65625c1.503906-1.496094 2.34375-3.535156 2.34375-5.65625v-11.785156c28.976562 20.265625 48 53.824218 48 91.785156zm-120-111.59375v12.28125l-13.65625 13.65625c-1.503906 1.496094-2.34375 3.535156-2.34375 5.65625v12.6875l-27.3125 27.3125h-12.6875c-2.121094 0-4.160156.839844-5.65625 2.34375l-13.65625 13.65625h-12.6875c-2.121094 0-4.160156.839844-5.65625 2.34375l-9.679688 9.679688c5.710938-53.511719 49.289063-95.765626 103.335938-99.617188zm0 0" />
                <path d="m240 164.6875v-20.6875c0-2.121094-.839844-4.160156-2.34375-5.65625l-16-16c-1.496094-1.503906-3.535156-2.34375-5.65625-2.34375h-16c-2.121094 0-4.160156.839844-5.65625 2.34375l-13.65625 13.65625h-28.6875c-4.414062 0-8 3.585938-8 8v40c0 4.414062 3.585938 8 8 8h12.6875l13.65625 13.65625c1.496094 1.503906 3.535156 2.34375 5.65625 2.34375h12.6875l13.65625 13.65625c1.496094 1.503906 3.535156 2.34375 5.65625 2.34375h16c2.121094 0 4.160156-.839844 5.65625-2.34375l16-16c1.503906-1.496094 2.34375-3.535156 2.34375-5.65625v-16c0-2.121094-.839844-4.160156-2.34375-5.65625zm0 32-11.3125 11.3125h-9.375l-13.65625-13.65625c-1.496094-1.503906-3.535156-2.34375-5.65625-2.34375h-12.6875l-13.65625-13.65625c-1.496094-1.503906-3.535156-2.34375-5.65625-2.34375h-8v-24h24c2.121094 0 4.160156-.839844 5.65625-2.34375l13.65625-13.65625h9.375l11.3125 11.3125v20.6875c0 2.121094.839844 4.160156 2.34375 5.65625l13.65625 13.65625zm0 0" />
              </svg>
            </div>
            <div className="detail-box">
              <h6>
                happy environment
              </h6>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="about_section ">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="img-box">
            <img src={img1} alt=""/>
          </div>
        </div>
        <div className="col-md-5 col-lg-4">
          <div className="detail-box">
            <div className="heading_container">
              <h2>
                A Few words about us
              </h2>
            </div>
            <p>
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
              of letters, as opposed to using 'Content here, content here', making it look like readable English. Many
              desktop publishing packages and web
            </p>
            <div>
              <a href="">
                Read More
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="info_section layout_padding">
    <div className="container">
      <div className="info_form">

        <div className="row">
          <div className="offset-lg-3 col-lg-3">
            <h5 className="form_heading">
              Newsletter
            </h5>
          </div>
          <div className="col-md-6">
            <form action="/">
              <input type="text" placeholder="Enter Your email"/>
              <button>
                subscribe
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="info_logo">
            <div>
              <a href="">
                <img src={none} alt="" />
                <span>
                  Brighton
                </span>
              </a>
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="info_links ">
            <h5>
              Contact Us
            </h5>
            <p className="pr-0 pr-md-4 pr-lg-5">
              Donec odio. Quisque volutpat mattis eros.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="info_insta">
            <h5>
              INFORMATION
            </h5>
            <p className="pr-0 pr-md-4 pr-md-5">
              Donec odio. Quisque volutpat mattis eros.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="pl-0 pl-lg-5 pl-md-4">
            <h5>
              MY ACCOUNT

            </h5>
            <p>
              Donec odio. Quisque volutpat mattis eros.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros
            </p>

          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default Home;
