import * as React from 'react'
import { DialogContent } from '../dialog'
import { TextArea } from '../lib/text-area'
import { LinkButton } from '../lib/link-button'
import { Ref } from '../lib/ref'
import { PopoverDropdown } from "../lib/popover-dropdown";
import { Row } from "../lib/row";
import { getGitIgnoreNames, getGitIgnoreText } from '../add-repository/gitignores'


interface IGitIgnoreProps {
  readonly text: string | null
  readonly onIgnoreTextChanged: (text: string) => void
  readonly onShowExamples: () => void
}

interface IGitIgnoreState {
  /** The names of the available gitignore templates. */
  readonly gitIgnoreNames: ReadonlyArray<string> | null
}

/** A view for creating or modifying the repository's gitignore file */
export class GitIgnore extends React.Component<IGitIgnoreProps, IGitIgnoreState> {
  public async componentDidMount() {
    const gitIgnoreNames = await getGitIgnoreNames()

    this.setState({ gitIgnoreNames })
  }

  private renderGitIgnoreList() {
    return this.state.gitIgnoreNames.map(name => (
      <Row key={name}>{name}</Row>
    ))
  }

  public render() {
    return (
      <DialogContent>
        <p>
          Editing <Ref>.gitignore</Ref>. This file specifies intentionally
          untracked files that Git should ignore. Files already tracked by Git
          are not affected.{' '}
          <LinkButton onClick={this.props.onShowExamples}>
            Learn more about gitignore files
          </LinkButton>
        </p>

        <p>
          It looks like <Ref>.gitignore</Ref> is empty. You can start from scratch or{' '}
          <PopoverDropdown contentTitle={"Choose a .gitignore template"} buttonContent={"select a template"} label={''}>
            {this.renderGitIgnoreList()}
          </PopoverDropdown>
          {' '}to get started.
        </p>

        <TextArea
          placeholder="Ignored files"
          value={this.props.text || ''}
          onValueChanged={this.props.onIgnoreTextChanged}
          textareaClassName="gitignore"
        />
      </DialogContent>
    )
  }
}
