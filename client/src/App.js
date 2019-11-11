import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import QuestionItem from './components/QuestionItem';

import './App.css';

class App extends Component {
    state = {
        errors: {},
        survey: {},
        surveyAnswer: {},
    }

    componentDidMount() {
        axios.get('/api/survey')
            .then(res => {
                this.setState({survey: res.data});
            })
            .catch(errors => {
                this.setState({errors});
            });
    }

    onNext = (questionID, answer) => {
        if (answer && answer !== '') {
            let newSurveyAnswer = this.state.surveyAnswer;
            newSurveyAnswer[questionID] = answer;
            this.setState({surveyAnswer: newSurveyAnswer});
        }
    }

    onSubmit = () => {
        let surveyAnswer = {};
        surveyAnswer.surveyId = this.state.survey._id;
        surveyAnswer.answers = this.state.surveyAnswer;

        axios.post('/api/surveyAnswer', surveyAnswer)
            .then(res => {
                alert('Success');
            })
            .catch(errors => {
                this.setState({errors});
            });
    }

    render() {
        const {survey, surveyAnswer} = this.state;
        let questions = survey && survey.surveyItems ? survey.surveyItems.map((item, index) => (
            <Route
                key={item.questionID}
                path={'/'+ item.questionID}
                render={props =>
                    <QuestionItem
                        {...props}
                        item={item}
                        answer={surveyAnswer[item.questionID]}
                        onNext={this.onNext}
                        onSubmit={this.onSubmit}
                    />
                }
            />
        )) : null;
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" render={props => <Redirect to='page-welcome' />} />
                    <div className="container">
                        <Switch>
                            {questions}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
