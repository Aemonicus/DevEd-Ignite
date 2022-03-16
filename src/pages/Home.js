import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { loadGames } from "../actions/gamesAction"
import GameDetail from "../components/GameDetail"
import Game from "../components/Game"
import styled from "styled-components"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { fadeIn } from "../animations";


const Home = () => {
  const location = useLocation()
  const pathId = location.pathname.split("/")[ 2 ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadGames())
  }, [ dispatch ])

  const { popular, upcoming, newGames, searched } = useSelector(state => state.games)

  return (
    <StyledGameList >
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathId && < GameDetail pathId={pathId} />}
        </AnimatePresence>
        {searched.length > 0 && (
          <>
            <motion.h2 variants={fadeIn} initial="hidden" animate="show">Searched Games</motion.h2>
            <StyledGames>
              {searched.map(game => (
                <Game
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
                ></Game>
              ))}
            </StyledGames>
          </>
        )}
        <motion.h2 variants={fadeIn} initial="hidden" animate="show">Upcoming Games</motion.h2>
        <StyledGames >
          {upcoming.map(game => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            ></Game>
          ))}
        </StyledGames>
        <h2>Popular Games</h2>
        <StyledGames>
          {popular.map(game => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            ></Game>
          ))}
        </StyledGames>
        <h2>New Games</h2>
        <StyledGames>
          {newGames.map(game => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            ></Game>
          ))}
        </StyledGames>
      </AnimateSharedLayout>
    </StyledGameList>
  )
}

const StyledGameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const StyledGames = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home