import {FC} from "react";

interface Props {
    code: string;
}

const VerificationCode: FC<Props> = ({code}) => {
    return (
        <div>
            <p>
                Verification code ${code}
            </p>
            <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Confirm registration</a>

        </div>
    );
};

export default VerificationCode;
