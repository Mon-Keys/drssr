import Svg, { Path, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
    color?: string;
}

function SvgComponent(props: IconProps) {
    return (
        <Svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14.009 21.283c7.216 0 12.067-5.818 12.067-7.62 0-1.802-4.869-7.611-12.067-7.611-7.11 0-12.085 5.81-12.085 7.611 0 1.802 4.957 7.62 12.085 7.62zm0-1.723c-5.608 0-10.046-4.666-10.046-5.897 0-1.028 4.438-5.889 10.046-5.889 5.58 0 10.028 4.86 10.028 5.89 0 1.23-4.447 5.897-10.028 5.897zm0-1.177c2.619 0 4.72-2.153 4.72-4.72a4.69 4.69 0 00-4.72-4.71c-2.637 0-4.746 2.082-4.738 4.71.018 2.567 2.101 4.72 4.738 4.72zm-.009-3.2c-.844 0-1.53-.685-1.53-1.52s.686-1.52 1.53-1.52 1.53.685 1.53 1.52-.686 1.52-1.53 1.52z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;
