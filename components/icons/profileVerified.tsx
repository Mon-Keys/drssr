import Svg, { Path, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
    color?: string;
}

const SvgComponent = (props: IconProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            d="M4.178 14.086h1.436c.127 0 .219.036.313.13l1.02 1.013c.869.876 1.687.87 2.556 0l1.02-1.012c.1-.095.186-.131.318-.131h1.43c1.234 0 1.814-.577 1.814-1.815v-1.43c0-.132.038-.22.132-.32l1.013-1.017c.874-.87.869-1.688 0-2.558l-1.013-1.018a.401.401 0 0 1-.132-.313V4.179c0-1.229-.577-1.814-1.813-1.814H10.84a.41.41 0 0 1-.319-.127L9.503 1.226c-.87-.876-1.687-.87-2.557.001L5.927 2.238a.399.399 0 0 1-.313.127H4.178c-1.234 0-1.814.573-1.814 1.814v1.436c0 .127-.032.22-.126.313L1.225 6.946c-.874.87-.869 1.689 0 2.558l1.013 1.018c.094.1.126.187.126.318v1.431c0 1.234.581 1.815 1.814 1.815Z"
            fill="#000"
        />
        <Path
            d="M7.48 11.529c-.252 0-.458-.104-.645-.347L5.194 9.186a.77.77 0 0 1-.181-.478c0-.346.27-.623.616-.623.206 0 .367.076.54.297l1.29 1.64 2.768-4.434c.146-.234.336-.35.547-.35.328 0 .636.235.636.58 0 .16-.081.325-.175.473l-3.134 4.886c-.152.229-.37.352-.62.352Z"
            fill={props.color}
        />
    </Svg>
);

export default SvgComponent;
