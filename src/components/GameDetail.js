import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smallImage } from "../util";
//IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {

  const navigate = useNavigate()

  const { screen, game, isLoading } = useSelector(state => state.detail)

  const exitDetailHandler = e => {
    const element = e.target
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto"
      navigate("/")
    }
  }

  const getStarsRating = () => {
    const stars = []
    const rating = Math.floor(game.rating)

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>)
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>)
      }
    }
    return stars
  }

  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
      case "PlayStation 5":
        return playstation;
      case "Xbox One":
      case "Xbox S":
      case "Xbox Series S/X":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };

  return (
    <>
      {!isLoading && (
        <StyledCardShadow className="shadow" onClick={exitDetailHandler}>
          <StyledDetail layoutId={pathId} >
            <StyledStats >
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStarsRating()}
              </div>
              <StyledInfo >
                <h3>Platforms</h3>
                <StyledPlatforms >
                  {game.platforms.map(data => (
                    <img key={data.platform.id} src={getPlatform(data.platform.name)} title={data.platform.name} alt={data.platform.name}></img>
                  ))}
                </StyledPlatforms>
              </StyledInfo>
            </StyledStats>

            <StyledMedia >
              <motion.img layoutId={`image ${pathId}`} src={smallImage(game.background_image, 1280)} alt="image" />
            </StyledMedia>

            <StyledDescription>
              <p>{game.description_raw}</p>
            </StyledDescription>

            <div className="gallery">
              {screen.results.map(screen => (
                <img key={screen.id} src={smallImage(screen.image, 1280)} alt="game image" />
              ))}
            </div>
          </StyledDetail>
        </StyledCardShadow>
      )}
    </>
  )
}

const StyledCardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const StyledDetail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`;

const StyledStats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const StyledInfo = styled(motion.div)`
  text-align: center;
`;
const StyledPlatforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;

const StyledMedia = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const StyledDescription = styled(motion.div)`
  margin: 5rem 0rem;
`;


export default GameDetail