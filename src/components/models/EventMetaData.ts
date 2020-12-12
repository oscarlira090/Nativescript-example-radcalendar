import {
    DataFormEditorType,
    PropertyGroup,
    DataFormGridLayout,

} from "nativescript-ui-dataform";
import Reminder from "@/components/models/Reminder.ts";

export default class EventMetaData {
    greeting: string;
    isReadOnly: string
    commitMode: string
    validationMode: string
    propertyAnnotations: object

    constructor() {
        this.isReadOnly = 'false'
        this.commitMode = 'Immediate'
        this.validationMode = 'Manual'
        this.propertyAnnotations = [
            {
                name: 'id',
                ignore: true
            },
            {
                name: 'type',
                ignore: true
            },
            {
                name: 'scheduleid1',
                ignore: true
            },
            {
                name: 'scheduleid2',
                ignore: true
            },
            {
                name: 'dueDate',
                ignore: true
            },
            {
                name: 'dueTime',
                ignore: true
            },
            {
                name: 'reminder2',
                ignore: true
            },
            {
                name: 'title',
                displayName: 'Title',
                hintText: '',
                editor: DataFormEditorType.Text,
                imageResource: "res://ic_dataform_guest",
                validators:
                    [
                        {
                            name: 'NonEmpty',
                            params:
                            {
                                errorMessage: "Required"
                            }
                        }
                    ]
            },
            {
                name: 'description',
                displayName: 'Description',
                hintText: '',
                editor: DataFormEditorType.Text,
                //imageResource:"res://ic_email",
                validators:
                    [
                        
                    ]
            },
            {
                name: 'isAllDay',
                displayName: 'All Day',
                hintText: '',
                editor: DataFormEditorType.Switch,
                //imageResource:"res://ic_pass",
            },
            {
                name: 'reminder',
                displayName: 'Reminder',
                hintText: '',
                editor: DataFormEditorType.Picker,
                valuesProvider: Reminder.getReminders(),
            },
            {
                name: 'startDate',
                displayName: 'Date',
                hintText: '',
                editor: DataFormEditorType.DatePicker,
                groupName: "Start Date",
                //imageResource:"res://ic_email",
                index: 0,
                columnIndex: 0,
                validators:
                    [
                        {
                            name: 'NonEmpty',
                            params:
                            {
                                errorMessage: "Required"
                            }
                        },
                    ]
            },
            {
                name: 'startTime',
                displayName: 'Time',
                hintText: '',
                editor: DataFormEditorType.TimePicker,
                //imageResource:"res://ic_email",
                groupName: "Start Date",
                index: 0,
                columnIndex: 0,
                validators:
                    [
                        {
                            name: 'NonEmpty',
                            params:
                            {
                                errorMessage: "Required"
                            }
                        },
                    ]
            },

            {
                name: 'endDate',
                displayName: 'Date',
                hintText: '',
                editor: DataFormEditorType.DatePicker,
                //imageResource:"res://ic_email",
                groupName: "End Date",
                index: 0,
                columnIndex: 0,
                validators:
                    [
                        {
                            name: 'NonEmpty',
                            params:
                            {
                                errorMessage: "Required"
                            }
                        }
                    ]

            },
            {
                name: 'endTime',
                displayName: 'Time',
                hintText: '',
                editor: DataFormEditorType.TimePicker,
                //imageResource:"res://ic_email",
                groupName: "End Date",
                index: 0,
                columnIndex: 1,
                validators:
                    [
                        {
                            name: 'NonEmpty',
                            params:
                            {
                                errorMessage: "Required"
                            }
                        },
                    ]
            }
        ]
    }

    getGroups() {
        let groups: object[] = [];

        let pg1 = new PropertyGroup()
        let grid1 = new DataFormGridLayout()
        pg1.layout = grid1
        pg1.name = "Start Date"
        pg1.collapsible = false
        pg1.collapsed = false
        groups.push(pg1)

        let pg2 = new PropertyGroup()
        let grid2 = new DataFormGridLayout()
        pg2.layout = grid2
        pg2.name = "End Date"
        pg2.collapsible = false
        pg2.collapsed = false
        groups.push(pg2)
        return groups
    }
}
