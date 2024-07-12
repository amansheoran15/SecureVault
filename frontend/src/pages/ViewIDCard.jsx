import AadhaarCard from "../components/AadhaarCard.jsx";
import MoneyCard from "../components/MoneyCard.jsx";

export function ViewIDCard() {
    const aadhaarData = {
        name: 'Dinesh Kumar',
        aadhaarNumber: '1234 5678 9123',
        dob: '02/06/2045',
        gender: 'Male',
        address: '1234, Example Street, City, State, 123456',
    };

    const moneycardData = {
        type: "Credit Card",
        bank: 'SBI',
        tagline: 'Universal Bank',
        cardNumber: '5375 4411 4540 0954',
        FirstName: 'Dinesh',
        MiddleName: '',
        LastName: 'Kumar',
        validThru: {
            month: '06',
            year: '24'
        },
        cvv: '013'
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                {/*<AadhaarCard {...aadhaarData} />*/}
                <MoneyCard {...moneycardData} />
            </div>
        </>
    )
}