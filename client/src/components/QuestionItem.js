import React, { Component } from 'react';

class QuestionItem extends Component {
    state = {
        answer: this.props.answer || "",
        error: {
            msg: 'Question must be answered!',
            isError: false
        }
    }

    handleClick = () => {        
        let answer = this.state.answer;
        if (answer === '' && this.props.item.type !== 'Page') {
            let newError = this.state.error;
            newError.isError = true;
            this.setState({error: newError});
            return;
        }
        let next = this.props.item.type === 'Radio' && answer === 'no' ? '/page-uneligible' : `/${this.props.item.next}`;

        this.props.onNext(this.props.item.questionID, answer);
        
        this.props.history.push(next);
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    handleChange = e => {
        const { value } = e.target;

        this.setState({
            answer: value
        })
    }
    handleCheckboxChange = e => {
        const tempState = {
            answer: {
                ...this.state.answer,
                [e.target.name]: e.target.checked
            }
        }
        this.setState(tempState)
    }

    render() {
        const { heading, body, question, next, questionID, choices, type } = this.props.item;
        let displayHeading, displayBody, displayNext, displayAnswer, displayQuestion, displayBack, displaySubmit, displayError;
        displayHeading = heading ? <h1>{heading}</h1> : null;
        displayBody = body ? <p>{body}</p> : null;
        displayQuestion = question ? <p>{question}</p> : null;
        displayNext = next ? <button onClick={this.handleClick}>Next</button> : null;
        displayBack = questionID !== 'page-welcome' ? <button onClick={this.handleBack}>Back</button> : null;
        displaySubmit = questionID === 'page-finish' ? <button onClick={this.props.onSubmit}>Submit</button> : null;
        displayError = this.state.error.isError ? <small>{this.state.error.msg}</small> : null;

        if (type === 'Text') {
            displayAnswer = <input type="text" name={questionID} value={this.state.answer} onChange={this.handleChange} />
        }
        if (type === 'Radio') {
            displayAnswer = choices.map((choice, index) => {
                return (
                    <div key={index}>
                        <label>{choice.label}</label>
                        <input type='radio' name={questionID} onChange={this.handleChange} value={choice.value} checked={choice.value === this.state.answer} />
                    </div>
                )
            })
        }
        if (type === 'Checkbox') {
            displayAnswer = choices.map((choice, index) => {
                return (
                    <div key={index}>
                        <label>{choice.label}</label>
                        <input type='checkbox' name={choice.value} onChange={this.handleCheckboxChange} value={this.state.answer || false} checked={this.state.answer && this.state.answer[choice.value]} />
                    </div>
                )
            })
        }

        return (
            <div className='container'>
                {displayHeading}
                {displayBody}
                {displayQuestion}
                {displayAnswer}
                <br />
                {displayError}
                {displayBack}
                {displayNext}
                {displaySubmit}
            </div>
        );
    }
}

export default QuestionItem;