import classes from './Checkout.module.css';
import { useRef } from 'react';
import { useState } from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputValid,setFormInputValid]=useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    })
    const nameInputRef = useRef();
    const StreetInputRef = useRef();
    const PostalCodeInputRef = useRef();
    const CityInputRef = useRef();

    const confirmHandler = (event) => {
         event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = StreetInputRef.current.value;
        const enteredPostalCode = PostalCodeInputRef.current.value;
        const enteredCityInput = CityInputRef.current.value;

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid=!isEmpty(enteredStreet);
        const enteredPostalCodeIsValid=isFiveChars(enteredPostalCode);
        const enteredCityInputIsValid=!isEmpty(enteredCityInput);

        setFormInputValid({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postalCode:enteredPostalCodeIsValid,
            city:enteredCityInputIsValid
        })
        
        const FormIsValid=enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityInputIsValid
        if(!FormIsValid)
        {
            return
        }
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCityInput,
            postalCode:enteredPostalCode
        });
    };
    const nameControlClasses=`${classes.control} ${formInputValid.name ? '': classes.invalid}`
    const streetControlClasses=`${classes.control} ${formInputValid.street ? '': classes.invalid}`
    const cityControlClasses=`${classes.control} ${formInputValid.city ? '': classes.invalid}`
    const postalCodeControlClasses=`${classes.control} ${formInputValid.postalCode ? '': classes.invalid}`


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValid.name && <p>Please Enter A Valid Name!</p>}
            </div>
            <div className={streetControlClasses} >
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={StreetInputRef} />
                {!formInputValid.street && <p>Please Enter A Valid Sreet!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={PostalCodeInputRef} />
                {!formInputValid.postalCode && <p>Please Enter A Valid PostalCode!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={CityInputRef} />
                {!formInputValid.city && <p>Please Enter A Valid CityName!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;