import { useGame } from "../hooks";
import { HGames } from "./Games";

export const ListView = () => {
    const { setCurrentGame } = useGame();

    return (
        <div className="flex flex-col h-full game-list">
            {HGames.map((game) => (
                <div className="flex gap-2 p-3 even:bg-black" key={game.key}>
                    <div
                        className="game-icon"
                        onClick={() => setCurrentGame(game)}
                    />
                    <div className="flex gap-2 flex-col">
                        <div className="bold">{game.name}</div>
                        <div className="text-sm text-muted">{game.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
