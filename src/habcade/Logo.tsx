export enum Logos {
    big = "logo-big",
    small = "logo-mini1",
    long = "logo-mini2",
    bigAnimated = "logo-big-animated",
    hcAnimated = "logo-hc-animated",
}
export const Logo = (props: { variant: Logos; className?: string }) => {
    const { variant, className = "" } = props;
    return <div className={`${variant} ${className}`} />;
};
