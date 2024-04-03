import { ListView } from "./gameList/ListView";
import { GameStage } from "./games/GameStage";
import { Footer } from "./habcade/Footer";
import { LoadingScreen } from "./habcade/LoadingScreen";
import { useGame } from "./hooks";

export const App = () => {
    const { currentGame } = useGame();

    return (
        <>
            {currentGame ? (
                <GameStage />
            ) : (
                <div className="h-full w-full overflow-hidden flex flex-col p-3 grid-bg">
                    <ListView />
                    <Footer />
                </div>
            )}
            <LoadingScreen ready={true} />
        </>
    );
};
