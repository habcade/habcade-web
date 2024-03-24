import { useLanester } from "./useLanester";

export const LSUI = () => {
    const { distance, speed, totaled, started, running } = useLanester();
    return (
        <div className="ls-ui absolute">
            <div className="ls-ui-sign">
                <div className="ls-ui-sign-post" />
                {(!started || (!running && started)) && (
                    <div className="ls-ui-sign-plate ls-ui-sign-warn">
                        <div className="ls-ui-sign-text text-black text-center">
                            Press Space to...
                        </div>
                        <div className="ls-ui-sign-title">
                            {started ? "Restart" : "Start"}
                        </div>
                    </div>
                )}
                <div className="ls-ui-sign-plate">
                    <div className="ls-ui-sign-text text-black">
                        {Math.floor(distance)}
                    </div>
                    <div className="ls-ui-sign-title">Distance</div>
                </div>
                <div className="ls-ui-sign-plate">
                    <div className="ls-ui-sign-text text-black">
                        {Math.floor(speed)}
                    </div>
                    <div className="ls-ui-sign-title">Speed</div>
                </div>
                <div className="ls-ui-sign-plate">
                    <div className="ls-ui-sign-text text-black">
                        {Math.floor(totaled)}
                    </div>
                    <div className="ls-ui-sign-title">Cars Passed</div>
                </div>
            </div>
        </div>
    );
};
