import { Logo, Logos } from "./Logo";

export const Footer = () => {
    return (
        <div className="mt-auto w-full p-3 h-border-black text-xs flex gap-1 rounded-lg">
            <div className="flex flex-col gap-1 self-center">
                <div>© 2024 Laynester</div>
                <div className="flex gap-2">
                    <div className="cursor-pointer underline">
                        Register Hotel
                    </div>
                    <div className="cursor-pointer underline">Discord</div>
                </div>
            </div>
            <Logo variant={Logos.long} className="ms-auto" />
        </div>
    );
};
