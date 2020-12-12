import {
    DataFormEditorType,
    PropertyGroup,
    DataFormGridLayout,

} from "nativescript-ui-dataform";
import Reminder from "@/components/models/Reminder.ts";

export default class TaskMetaData {
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
                name: 'reminder',
                displayName: 'Reminder for start date',
                hintText: '',
                editor: DataFormEditorType.Picker,
                valuesProvider: Reminder.getReminders(),
            },
            {
                name: 'reminder2',
                displayName: 'Reminder for due date',
                hintText: '',
                editor: DataFormEditorType.Picker,
                valuesProvider: Reminder.getReminders(),
            },
            {
                name: 'dueDate',
                displayName: 'Date',
                hintText: '',
                editor: DataFormEditorType.DatePicker,
                //imageResource:"res://ic_email",
                groupName: "Due Date",
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
                name: 'dueTime',
                displayName: 'Time',
                hintText: '',
                editor: DataFormEditorType.TimePicker,
                //imageResource:"res://ic_email",
                groupName: "Due Date",
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
            },
            {
                name: 'isAllDay',
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
                name: 'done',
                ignore: true
            },
        ]
    }

    getGroups() {
        let groups: object[] = [];

        let pg1 = new PropertyGroup()
        let grid1 = new DataFormGridLayout()
        pg1.layout = grid1
        pg1.name = "Due Date"
        pg1.collapsible = true
        pg1.collapsed = true
        groups.push(pg1)


        let pg2 = new PropertyGroup()
        let grid2 = new DataFormGridLayout()
        pg2.layout = grid2
        pg2.name = "Start Date"
        pg2.collapsible = true
        pg2.collapsed = true
        groups.push(pg2)

        let pg3 = new PropertyGroup()
        let grid3 = new DataFormGridLayout()
        pg3.layout = grid3
        pg3.name = "End Date"
        pg3.collapsible = true
        pg3.collapsed = true
        groups.push(pg3)
        return groups
    }
}
