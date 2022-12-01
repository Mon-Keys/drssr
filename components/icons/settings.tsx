import Svg, { Path, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
    color?: string;
}

function SvgComponent(props: IconProps) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M10.745 22.655h2.038c.83 0 1.478-.516 1.67-1.31l.409-1.777.267-.092 1.55.95c.7.437 1.52.328 2.109-.265l1.412-1.4c.592-.599.698-1.424.26-2.112l-.966-1.538.099-.25 1.773-.42a1.68 1.68 0 001.306-1.67V10.79c0-.82-.512-1.476-1.306-1.67l-1.757-.428-.107-.266.967-1.538c.439-.688.331-1.505-.261-2.113l-1.412-1.408c-.58-.584-1.4-.697-2.1-.264l-1.55.95-.285-.11-.408-1.776c-.192-.796-.84-1.31-1.67-1.31h-2.038c-.83 0-1.478.518-1.67 1.31L8.66 3.944l-.284.109-1.542-.95c-.7-.43-1.529-.32-2.109.264L3.321 4.775c-.593.608-.709 1.425-.261 2.113l.958 1.538-.099.266-1.757.428c-.797.195-1.306.85-1.306 1.67v1.982c0 .82.52 1.476 1.306 1.67l1.774.42.09.249-.958 1.538c-.447.688-.331 1.513.26 2.113l1.404 1.4c.589.592 1.417.701 2.117.264l1.543-.95.267.092.416 1.777c.192.794.84 1.31 1.67 1.31zm.25-1.82c-.17 0-.256-.073-.285-.228l-.595-2.475a5.55 5.55 0 01-1.733-.711l-2.175 1.335c-.119.088-.246.07-.363-.047l-1.071-1.07c-.11-.11-.115-.229-.039-.362l1.341-2.159a6.67 6.67 0 01-.698-1.719l-2.475-.585c-.155-.029-.227-.116-.227-.284v-1.506c0-.177.064-.254.227-.284l2.467-.594c.157-.667.453-1.292.69-1.727l-1.333-2.16c-.085-.14-.082-.26.029-.378l1.081-1.053c.117-.117.227-.134.37-.047l2.158 1.31c.455-.271 1.119-.544 1.757-.713l.59-2.473c.028-.155.114-.227.284-.227h1.539c.169 0 .254.072.276.227l.605 2.49a6.773 6.773 0 011.733.705l2.16-1.315c.153-.087.254-.072.38.046l1.072 1.053c.119.12.115.238.03.38l-1.328 2.155c.243.433.532 1.06.688 1.723l2.476.598c.156.03.228.107.228.284v1.506c0 .168-.082.255-.228.284l-2.485.589a6.428 6.428 0 01-.696 1.715l1.335 2.155c.079.134.082.253-.036.363l-1.063 1.07c-.13.118-.246.133-.373.046l-2.166-1.331a5.577 5.577 0 01-1.727.711l-.605 2.475c-.022.155-.107.228-.276.228h-1.54zm.768-5.26c2.09 0 3.81-1.719 3.81-3.819 0-2.082-1.72-3.799-3.81-3.799s-3.819 1.717-3.819 3.8a3.836 3.836 0 003.82 3.818zm0-1.723a2.098 2.098 0 01-2.085-2.096c0-1.136.943-2.076 2.085-2.076 1.126 0 2.066.944 2.066 2.076 0 1.146-.94 2.096-2.066 2.096z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;
