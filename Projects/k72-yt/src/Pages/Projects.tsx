import { useGSAP } from "@gsap/react";
import ProjectCard from "../components/projects/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Projects = () => {

  const Project = [
  [
    "https://k72.ca/images/caseStudies/iA_BRAND/Thumbnail.png?w=640&h=290&s=755b635c06d126151d64017fa1042a7c",
    "https://k72.ca/images/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail.jpg?w=1280&h=960&s=650a04dfc31ad85bfc64c0ddccc83f1e",
  ],
  [
    "https://k72.ca/images/caseStudies/COUP_FUMANT/CF_thumbnail.jpg?w=1280&h=960&s=c119303a20520c4188aa3f592038fd4c",
    "https://k72.ca/images/caseStudies/CRISIS24/crisis24_behance_1920X1200_cartes.jpg?w=1280&h=960&s=bb42c9de87442e1bffc542c332e07124",
  ],
  [
    "https://k72.ca/images/caseStudies/FRUITE/Fruite_thumbnail_bbq.jpg?w=1280&h=960&s=953c1f702bec28d66d07e95bc1261821",
    "https://k72.ca/images/caseStudies/Opto/thumbnailimage_opto.jpg?w=1280&h=960&s=938f0bfb3de1ff2a2846b884eec2d757",
  ],
  [
    "https://k72.ca/images/caseStudies/A_table/thumbnailimage_atable2.jpg?w=1280&h=960&s=b1cfc8abd6135cf78017737130e49e47",
    "https://k72.ca/images/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960.jpg?w=1280&h=960&s=b5151821a8c0d9603263d7ec827bee9b",
  ],
  [
    "https://k72.ca/images/caseStudies/BEST/BEST_site_menu_Thumbnail.jpg?w=1280&h=960&s=d3b20d81946c6a7f4a6cd7ce1cfbb0fd",
    "https://k72.ca/images/caseStudies/SollioAg/thumbnailimage_SollioAg.jpg?w=1280&h=960&s=3085861fabc3a15e7f8f8a01c07afa4f",
  ],
];
gsap.registerPlugin(ScrollTrigger);
useGSAP(function () {
  gsap.from('.hero',{
    height:'100px',
    stagger:{
      amount:0.5
    },
    scrollTrigger:{
      trigger:".hello",
      start:"top 100%",
      end:"top -150%",
      scrub:true
    }
  })
})
  return (
    <div className="p-4">
      <div className=" pt-[45vh]">
        <h2 className="font-[font2] text-black text-[9vw] uppercase">
          Projects
        </h2>
      </div>
      <div className="-mt-15 hello">
        {Project.map((item, idx) => {
          return (
            <div key={idx} className="hero w-full h-[850px]  flex gap-3 mb-3">
              <ProjectCard key={idx} {...item} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
