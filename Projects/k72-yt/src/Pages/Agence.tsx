import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import  { useRef } from "react";

const Agence = () => {
  const imageDivRef = useRef(null);
  const imageRef=useRef(null)
  const imageArray=[
    'https://k72.ca/images/teamMembers/SebR_640X960.jpg?w=640&h=960&s=81dfdbd4b658503ba32862901a1ea3ca',
    'https://k72.ca/images/teamMembers/Carl_480x640.jpg?w=480&h=640&fit=crop&s=f0a84706bc91a6f505e8ad35f520f0b7',
    'https://k72.ca/images/teamMembers/Olivier_480x640.jpg?w=480&h=640&fit=crop&s=c13569c0753117d04f1a93cf7b446d64',
    'https://k72.ca/images/teamMembers/ChantalG_480x640.jpg?w=480&h=640&fit=crop&s=13093769c4a19cecd291ddcccd898991',
    'https://k72.ca/images/teamMembers/Michele_480X640.jpg?w=480&h=640&fit=crop&s=ce85dc6d140947736baa739d0e59dab2',
    'https://k72.ca/images/teamMembers/Michele_480X640.jpg?w=480&h=640&fit=crop&s=ce85dc6d140947736baa739d0e59dab2',
    'https://k72.ca/images/teamMembers/CAMILLE_480X640_2.jpg?w=480&h=640&fit=crop&s=74317575b2d72fd11c5296615c383e4a',
    'https://k72.ca/images/teamMembers/MEGGIE_480X640_2.jpg?w=480&h=640&fit=crop&s=3604b19f8fc7b40f517954147698d847',
    'https://k72.ca/images/teamMembers/joel_480X640_3.jpg?w=480&h=640&fit=crop&s=1cadbf143b3aa916b1b414464acbb4d6'
    
  ]
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(function(){
    gsap.to(imageDivRef.current,{
      scrollTrigger:{
        trigger:imageDivRef.current,
        start:'top 20%',
        end:'top -80%',
        pin:true,
        pinSpacing:true,
        pinReparent:true,
        pinType:'transform',
        invalidateOnRefresh:true,
        scrub:1,
        // markers:true,
        onUpdate:function(elem){
          let imageindex
          if (elem.progress<1){
            imageindex=Math.floor((elem.progress)* imageArray.length)
          }else{
            imageindex=imageArray.length-1
          } 
          console.log(imageindex)
          imageRef.current.src=imageArray[imageindex]
        }
      }
    })
  })
  return (
    <div>
      <div className="section1 py-1">
        <div
          className="absolute overflow-hidden w-[15vw] h-[20vw] rounded-4xl top-[20vh] left-[20vw]"
          ref={imageDivRef}
        >
          <img
            className="h-full w-full object-cover"
            src="https://k72.ca/images/teamMembers/Carl_480x640.jpg?w=480&h=640&fit=crop&s=f0a84706bc91a6f505e8ad35f520f0b7"
            alt=""
            ref={imageRef}
          />
        </div>
        <div className="relative font-[font2]">
          <div className="mt-[55vh]">
            <h1 className="text-[17vw] uppercase leading-[17vw] ">
              Soixan7th <br /> Twelve
            </h1>
          </div>
          <div className="pl-[40%] ">
            <p className="text-5xl ">
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; Our curiosity
              fuels our creativity. We remain humble and say no to big egos,
              even yours. A brand is alive. She has values, a personality, a
              history. If we forget that, we can make good numbers in the short
              term, but we kill it in the long term. This is why we are
              committed to giving perspective, to building influential brands.
            </p>
          </div>
        </div>
      </div>

      <div className="section2 h-screen"></div>
    </div>
  );
};

export default Agence;
