import { ListView } from "./gameList/ListView";
import { useGame } from "./hooks";
import { GameStage } from "./games/GameStage";

export const App = () => {
    const { currentGame } = useGame();

    return <>{currentGame ? <GameStage /> : <ListView />}</>;
};
