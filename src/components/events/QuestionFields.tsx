import { Event, Signup } from "@tietokilta/ilmomasiina-models"
import { useField } from "formik"
import filter from "lodash/filter"
import find from "lodash/find"
import reject from "lodash/reject"
import without from "lodash/without"
import { ReactNode } from "react"
import FieldRow from "./FieldRow"
import { CheckBox, Select, Textarea, TextInput } from "./inputs"

type Props = {
  name: string
  questions: Event.Details.Question[]
}

const QuestionFields = ({ name, questions }: Props) => {
  // TODO: add formik-based validation
  const [{ value }, , { setValue }] =
    useField<Signup.Update.Body.Answer[]>(name)
  return (
    <>
      {questions.map((question) => {
        const currentAnswer =
          find(value, { questionId: question.id })?.answer || ""

        function updateAnswer(answer: string) {
          setValue(
            reject(value, { questionId: question.id }).concat({
              questionId: question.id,
              answer,
            })
          )
        }

        function toggleChecked(option: string, checked: boolean) {
          const currentAnswers = filter(currentAnswer.split(";"))
          const newAnswers = checked
            ? [...currentAnswers, option]
            : without(currentAnswers, option)
          updateAnswer(newAnswers.join(";"))
        }

        const help = question.public
          ? "Tämän kentän vastaukset ovat julkisia."
          : null

        let input: ReactNode
        switch (question.type) {
          case "text":
            input = (
              <TextInput
                type="text"
                id={question.id}
                required={question.required}
                value={currentAnswer}
                onChange={(e) => updateAnswer(e.target.value)}
              />
            )
            break
          case "number":
            input = (
              <TextInput
                type="number"
                id={question.id}
                required={question.required}
                value={currentAnswer}
                onChange={(e) => updateAnswer(e.target.value)}
              />
            )
            break
          case "checkbox": {
            const currentAnswers = currentAnswer.split(";")
            input = (
              <div className="flex flex-wrap gap-3">
                {question.options?.map((option, optIndex) => (
                  <CheckBox
                    // eslint-disable-next-line react/no-array-index-key
                    key={optIndex}
                    type="checkbox"
                    value={option}
                    required={
                      question.required &&
                      !currentAnswers.some((answer) => answer !== option)
                    }
                    checked={currentAnswers.includes(option)}
                    onChange={(e) => toggleChecked(option, e.target.checked)}
                    label={option}
                  />
                ))}
              </div>
            )
            break
          }
          case "textarea":
            input = (
              <Textarea
                id={question.id}
                rows={3}
                cols={40}
                required={question.required}
                value={currentAnswer}
                onChange={(e) => updateAnswer(e.target.value)}
              />
            )
            break
          case "select":
            if (question.options && question.options.length > 3) {
              input = (
                <Select
                  id={question.id}
                  required={question.required}
                  value={currentAnswer}
                  onChange={(e) => updateAnswer(e.target.value)}
                >
                  <option disabled={question.required} value="">
                    Valitse&hellip;
                  </option>
                  {question.options?.map((option) => (
                    <option key={question.id} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              )
            } else {
              input = (
                <div className="flex flex-wrap gap-3">
                  {question.options?.map((option, optIndex) => (
                    <CheckBox
                      // eslint-disable-next-line react/no-array-index-key
                      key={optIndex}
                      type="radio"
                      value={option}
                      required={question.required}
                      checked={currentAnswer === option}
                      onChange={(e) => updateAnswer(e.target.value)}
                      label={option}
                    />
                  ))}
                </div>
              )
            }
            break
          default:
            return null
        }

        return (
          <FieldRow
            key={question.id}
            id={question.id}
            label={question.question}
            required={question.required}
            help={help}
          >
            {input}
          </FieldRow>
        )
      })}
    </>
  )
}

export default QuestionFields
