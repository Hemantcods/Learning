import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const Stairs = ({ children }) => {
  const currentPath = useLocation().pathname;
  const pageref = useRef(null);
  const stairParentRef = useRef(null);
  useGSAP(
    function () {
      const tl = gsap.timeline();
      tl.from(".stair", {
        height: 0,
        stagger: {
          amount: -0.5,
        },
      });
      tl.to(".stair", {
        y: "100%",
        stagger: {
          amount: -0.5,
        },
      });
      tl.to(stairParentRef.current, {
        display: "none",
      });
      tl.to(".stair", {
        y: "0%",
      });

      gsap.from(pageref.current, {
        opacity:0,
        delay:1,
        scale:1.2
      })
    },
    [currentPath],
  );
  return (
    <div>
      <div ref={stairParentRef} className="h-screen fixed z-10  w-full">
        <div className="h-full flex w-full">
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
          <div className="stair h-full w-1/5 bg-black"></div>
        </div>
      </div>
      <div ref={pageref}>
      {children}
      </div>
    </div>
  );
};

export default Stairs;
