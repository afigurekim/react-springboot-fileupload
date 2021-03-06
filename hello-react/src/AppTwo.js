import React, { Component, Fragment } from "react";
import { render } from "react-dom";

import Dropzone from "react-dropzone";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
        };
    }

    onPreviewDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    }

    render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
        };

        return (
            <div className="appTwo">
                <Dropzone
                    accept="image/jpeg, image/png, image/gif"
                    onDrop={this.onPreviewDrop}
                >
                    Drop an image, get a preview!
                </Dropzone>
                {this.state.files.length > 0 && 
                    <Fragment>
                        <h3>Previews</h3>
                        {this.state.files.map((file) => (
                            <img 
                                alt="Preview"
                                key={file.preview}
                                src={file.preview}
                                style={previewStyle}
                            />
                        ))}
                    </Fragment>
                }
            </div>
        );
    }
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);