import React, { PureComponent } from "react";
import ReactDOM from 'react-dom'
import ScatterPlotBundle from "./lib"
import data from "./scatterData.json"

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dtWindow: [1505894400000, 1513695600000],
            currentOverlay: null
        }
    }

    render() {
        return (
            <ScatterPlotBundle
                data={data}
                dtWindow={[...this.state.dtWindow]}
                width={1200}
                height={400}
                currentOverlay={this.state.currentOverlay}
                render={null}
            />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));