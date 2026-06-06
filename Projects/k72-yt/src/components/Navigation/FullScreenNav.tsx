import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useRef } from "react";
import { NavBarContext } from "../../context/NavContext";

const FullScreenNav = () => {
  const fullNavLinkRef = useRef(null);
  const fullScreenRef = useRef(null);
  const Navcontext = useContext(NavBarContext);
  const [navOpen, setnavOpen] = Navcontext;

  const tl = useRef(null);

  useGSAP(function () {
    // 1. Create the timeline once and set it to paused initially
    tl.current = gsap.timeline({
      paused: true,
      onReverseComplete: function () {
        // Wait for the reverse animation to finish before hiding the container
        gsap.set(fullScreenRef.current, { display: "none" });
      },
    });

    tl.current.from(".stairing", {
      delay: 0.5, // Reduced from 1 to 0.3 so reversing doesn't awkwardly stall at the end
      height: 0,
      stagger: {
        amount: -0.5,
      },
    });
    tl.current.from(fullNavLinkRef.current, {
      opacity: 0,
    });
    tl.current.from(".moveL", {
      rotateX: 90,
      stagger: {
        amount: 0.2,
      },
    });
    tl.current.from(".navlink", {
      opacity: 0,
    });
  }, []); // Run only once on mount

  useGSAP(
    function () {
      // 2. Play or reverse the timeline based on state
      if (navOpen) {
        gsap.set(fullScreenRef.current, { display: "block" });
        tl.current?.play();
      } else {
        // If the timeline is at 0 (initial load), hide it immediately. Otherwise, reverse it.
        if (tl.current?.progress() === 0) {
          gsap.set(fullScreenRef.current, { display: "none" });
        } else {
          tl.current?.reverse();
        }
      }
    },
    [navOpen],
  );
  return (
    <div
      id="fullscreennav"
      ref={fullScreenRef}
      className="h-screen w-full absolute text-white overflow-hidden z-50"
    >
      <div className="h-screen w-full fixed">
        <div className="h-full flex w-full">
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
          <div className="stairing h-full w-1/5 bg-black"></div>
        </div>
      </div>
      <div ref={fullNavLinkRef} className="relative">
        <div className="flex w-full items-start justify-between p-5">
          <div className="">
            <div className="w-40 sm:w-30">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 44">
                <path
                  fillRule="evenodd"
                  fill="white"
                  d="M35.1441047,8.4486911 L58.6905011,8.4486911 L58.6905011,-1.3094819e-14 L35.1441047,-1.3094819e-14 L35.1441047,8.4486911 Z M20.0019577,0.000230366492 L8.83414254,25.3433089 L18.4876971,25.3433089 L29.5733875,0.000230366492 L20.0019577,0.000230366492 Z M72.5255345,0.000691099476 L72.5255345,8.44846073 L94.3991559,8.44846073 L94.3991559,16.8932356 L72.5275991,16.8932356 L72.5275991,19.5237906 L72.5255345,19.5237906 L72.5255345,43.9274346 L102.80937,43.9274346 L102.80937,35.4798953 L80.9357483,35.4798953 L80.9357483,25.3437696 L94.3996147,25.3428482 L94.3996147,16.8953089 L102.80937,16.8953089 L102.80937,0.000691099476 L72.5255345,0.000691099476 Z M-1.30398043e-14,43.9278953 L8.78642762,43.9278953 L8.78642762,0.0057591623 L-1.30398043e-14,0.0057591623 L-1.30398043e-14,43.9278953 Z M58.6849955,8.4486911 L43.1186904,43.9274346 L52.3166592,43.9274346 L67.9877996,8.4486911 L58.6849955,8.4486911 Z M18.4688864,25.3437696 L26.7045278,43.9278953 L36.2761871,43.9278953 L28.1676325,25.3375497 L18.4688864,25.3437696 Z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            className="h-32 w-32  relative group"
            onClick={() => {
              setnavOpen(false);
            }}
          >
            <div className="h-44 w-1 bg-white group-hover:bg-[#D3FD50] absolute -rotate-45 origin-top "></div>
            <div className="h-44 w-1 bg-white group-hover:bg-[#D3FD50] absolute right-0 rotate-45 origin-top "></div>
          </div>
        </div>
        <div id="all-links" className="py-32">
          <div className="relative origin-top border-t sm:bordeer-t-[0.5px] border-white/50 moveL">
            <h1 className="font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 sm:pt-4 text-center">
              Projects
            </h1>
            <div className="moveLink absolute flex top-0 bg-[#D3FD50] w-full overflow-hidden h-full">
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="relative origin-top border-t border-white/50 moveL">
            <h1 className="font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 sm:pt-4 text-center">
              Agency
            </h1>
            <div className="moveLink absolute flex top-0 bg-[#D3FD50] w-full overflow-hidden h-full">
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="relative origin-top border-t border-white/50 moveL">
            <h1 className="font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 sm:pt-4 text-center">
              contact
            </h1>
            <div className="moveLink absolute flex top-0 bg-[#D3FD50] w-full overflow-hidden h-full">
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.8] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="relative origin-top border-t border-b border-white/50 moveL">
            <h1 className="font-[font2] text-[7vw] uppercase leading-[0.9] pt-10 sm:pt-4 text-center">
              blog
            </h1>
            <div className="moveLink absolute flex top-0 bg-[#D3FD50] w-full overflow-hidden h-full">
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.9] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.9] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
              <div className=" flex items-center moveX  text-black">
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.9] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
                <h2 className="whitespace-nowrap font-[font2] text-[7vw] uppercase leading-[0.9] pt-10 text-center">
                  to see everything
                </h2>
                <img
                  src="https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290.jpg?w=640&h=290&s=ac50a70feaaa2601b3aacad544c6045b"
                  alt=""
                  className="h-36 w-96 object-cover shrink-0 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenNav;
