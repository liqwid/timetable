var FormWrap = React.createClass({
    render: function(){

        return(
            <div className="row">

                <LectureForm
                    destId = {this.props.destId.lecture}
                    authors = {this.props.authors}
                    themes = {this.props.themes}
                    lectures = {this.props.lectures}
                    onSubmit = {this.props.onSubmit}
                />

                <AuthorForm
                    destId = {this.props.destId.author}
                    authors = {this.props.authors}
                    onSubmit = {this.props.onSubmit}
                />

                <ThemeForm
                    destId = {this.props.destId.theme}
                    themes = {this.props.themes}
                    onSubmit = {this.props.onSubmit}
                />

            </div>
        );
    }
});