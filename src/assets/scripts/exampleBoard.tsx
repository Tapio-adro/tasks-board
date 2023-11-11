import { Board } from '../shared/types';


const board: Board = {
  data: {
    title: 'Example board',
    backgroundColors: [
      '#4BCE97',
      '#F5CD47',
      '#faa53d',
      '#f87462',
      '#9f8fef',
      '#579dff',
      '#60c6d2',
      '#94C748',
      '#e774bb',
      '#8590a2',
    ],
    labels: [
      {
        title: 'Example label',
        id: '123',
        color: '#4BCE97',
      },
      {
        title: 'Important',
        color: '#f87462',
        id: 'b59795ee-4920-451b-bb8d-6a9d680635d8',
      },
      {
        title: 'Label',
        color: '#e774bb',
        id: '02454592-7aeb-46c8-9d43-c6c834e6bbe6',
      },
      {
        title: 'Checklist info',
        color: '#F5CD47',
        id: '307e21ec-6cff-4b5f-8bcf-8eb6b2fa4fbc',
      },
    ],
    areCardLabelsExpanded: false,
    id: 'c640f524-3f5a-4e59-aa9f-560cfda2ae03',
  },
  columns: [
    {
      title: 'Example column',
      id: 'c2eadb38-2002-4915-aa37-6b088907554c',
      cards: [
        {
          title:
            '<--- To the left there is a sidebar you can open by clicking it. There you can manage your boards.',
          id: '91a25d64-d6f4-4240-96a0-85bf01be3ce5',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '0fdb4f34-5ca2-4d89-b958-4915042bf647',
              type: 'text',
              isEditorActive: false,
              text: '<p></p>\n',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'Example card',
          id: 'fbf38de5-b363-481f-ac1a-b16e905ea7af',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '28d46f91-fac7-4ae9-9d0a-8b717df3c5a3',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title:
            'Click the cross on any column to remove it. You will also be asked to confirm deletion',
          id: 'f642d4bc-6514-4d48-99c9-219bca7fcfbf',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '7feda5c8-8367-45d6-8241-32ed6d380db9',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'Click board title to change it',
          id: '7ee8d0c3-cd29-4be2-9226-78499b528c51',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '8358771c-4f7f-4475-afc2-ec93cb78155a',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
      ],
    },
    {
      title: 'You can click column to rename it',
      id: 'd22da6e8-2082-4b38-b9db-1520b17b5457',
      cards: [
        {
          title:
            'The same you can do with card by hovering it and clicking pen button',
          id: '4ef3432b-4232-45b8-aa3b-692065b8be36',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: 'da51dbc6-07c3-4822-ac71-63a90afb81e1',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'If you click card with RBM you will open Appearance editor',
          id: '19cdb839-5b75-44e1-9a0e-0433023fe93f',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: 'fa455e08-6223-4475-9fc2-6fb9f9364848',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title:
            'There you can set background color for the card like this one has',
          id: '879a62bc-09e8-442d-baa5-b7e80ae3527e',
          backgroundColor: '#F5CD47',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '51469ee0-4ae0-42d6-bb20-1d0b591eaa13',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'As well as add some labelIds to it',
          id: 'db0bcf0f-fc98-4586-9814-8c5ac8904415',
          backgroundColor: '',
          labelIds: ['123', 'b59795ee-4920-451b-bb8d-6a9d680635d8'],
          elements: [
            {
              title: 'Description',
              id: '1a90b23d-4777-49ca-b500-216f7dc6b0f1',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'Or both at the same time',
          id: '68664955-3d0e-4ee3-a67a-9d60a332bdf7',
          backgroundColor: '#9f8fef',
          labelIds: ['b59795ee-4920-451b-bb8d-6a9d680635d8'],
          elements: [
            {
              title: 'Description',
              id: 'cd7f593a-0fa8-4bf2-95e6-ac3e09eee8bf',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'In that window you can also remove the card',
          id: 'e28f1e34-6188-4acc-9ce8-f816e38abdd9',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '107b4b23-ade8-4310-8c65-fd71438dff36',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
      ],
    },
    {
      title: 'LabelIds',
      id: 'd893f78d-a48e-4581-ae46-0ded184a2a50',
      cards: [
        {
          title: 'You can create, change color, rename and delete labelIds',
          id: '62002b12-82b0-4dc0-84bf-976f8ff0bbba',
          backgroundColor: '',
          labelIds: ['02454592-7aeb-46c8-9d43-c6c834e6bbe6'],
          elements: [
            {
              title: 'Description',
              id: '4319929a-c643-454c-aaab-d8fa447313b5',
              type: 'text',
              isEditorActive: false,
              text: '<p></p>\n',
              isJustCreated: false,
            },
          ],
        },
        {
          title:
            'If you click any label on the card itself you will expand all the label names',
          id: 'b04d1770-6ab8-4dcb-83a0-ff530045470e',
          backgroundColor: '',
          labelIds: ['02454592-7aeb-46c8-9d43-c6c834e6bbe6'],
          elements: [
            {
              title: 'Description',
              id: '9b8c1cf3-29c5-4401-930c-4d4e749ea73e',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'After label is deleted it will be removed from all the cards',
          id: '7331e51c-a0aa-4632-b794-138d21d5c41e',
          backgroundColor: '',
          labelIds: ['02454592-7aeb-46c8-9d43-c6c834e6bbe6'],
          elements: [
            {
              title: 'Description',
              id: '5f00711b-8af9-4d6c-b892-77f754f45477',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
      ],
    },
    {
      title: 'Cards content',
      id: '3166fa30-6e8c-439b-90ea-1d189716c20e',
      cards: [
        {
          title: 'If you click card with LBM you will open Content editor',
          id: 'bab7e4d1-2126-4245-8d2f-18ee80ad888d',
          backgroundColor: '',
          labelIds: ['307e21ec-6cff-4b5f-8bcf-8eb6b2fa4fbc'],
          elements: [
            {
              title: 'Description',
              id: 'fc40de2c-74eb-4b5f-a146-d41322cd6295',
              type: 'text',
              isEditorActive: false,
              text: '<p></p>\n',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'There you can add text attachments or checklists',
          id: 'c2e5e454-a053-4946-84e4-788e61237247',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '98a42d33-19fb-4b86-8c8e-f6dd1942a3e8',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'All cards have default text attachment called Description',
          id: '3056c8d9-e2e1-45a7-8741-adb4a49adebb',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '34a2552e-7b80-4df5-a1c9-9f863ac0fb2d',
              type: 'text',
              isEditorActive: false,
              text: '<p></p>\n',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'This card has custom text attachment',
          id: '73b0386f-01ef-4ab8-b20b-d242caf264f9',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '4fe70175-dc72-4752-9cc0-11c8c18df288',
              type: 'text',
              isEditorActive: false,
              text: '<p></p>\n',
              isJustCreated: false,
            },
            {
              title: 'Text attachment',
              id: 'aed68cef-baca-4ec3-8431-5c48b028ef52',
              type: 'text',
              isEditorActive: false,
              text: '<p>Some text...</p>\n<p>You can style your text using the editor. <strong>Click </strong>on the <em>text </em>or <em>edit button</em> to <strong>start editing </strong>the <ins>text</ins>.</p>\n<p>An unordered list:</p>\n<ul>\n<li>item 1</li>\n<li>item 2</li>\n<li>item 3</li>\n</ul>\n',
              isJustCreated: false,
            },
          ],
        },
        {
          title: 'Card also can have checklists like this one',
          id: '03ca8f3d-b5f3-42df-97ab-e0637ba6cf91',
          backgroundColor: '',
          labelIds: ['307e21ec-6cff-4b5f-8bcf-8eb6b2fa4fbc'],
          elements: [
            {
              title: 'Description',
              id: '84db8ca4-4539-4718-953f-3b911fadcf10',
              type: 'text',
              isEditorActive: false,
              text: '<p></p>\n',
              isJustCreated: false,
            },
            {
              title: 'Example checklist',
              id: '2760997d-c6e3-4c25-b451-edc7cd3f10ca',
              type: 'checklist',
              isJustCreated: false,
              items: [
                {
                  id: '3d782255-b0fe-4485-85f1-7b890a9b8815',
                  text: 'item 1',
                  isChecked: false,
                },
                {
                  id: 'babfda8e-7c5e-4175-882a-d563a699ef41',
                  text: 'item 2',
                  isChecked: false,
                },
                {
                  id: '032b4d90-c7ae-41d0-8a5b-c5706bd84cf4',
                  text: ' item 3',
                  isChecked: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Other features',
      id: '29eb7ca5-0f80-460a-aa96-b030eb41f152',
      cards: [
        {
          title: 'Click button to the right to add another column',
          id: 'c26c0331-57c3-4b8d-8aa8-dd52d5b38370',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '16bc727c-dbcd-4d1b-b5b5-c8637c2d53d8',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title:
            'You can drag around any columns, cards and checklist items in cards',
          id: '23662498-d2bb-45d3-8cc4-95b357f59048',
          backgroundColor: '',
          labelIds: ['307e21ec-6cff-4b5f-8bcf-8eb6b2fa4fbc'],
          elements: [
            {
              title: 'Description',
              id: 'f554b02f-dbe2-4e4d-afab-00d17bbe208d',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
        {
          title:
            'In Appearance editor or in Content editor you can click card title to rename the card',
          id: '25bce589-9260-4fa4-ae82-f2215016435e',
          backgroundColor: '',
          labelIds: [],
          elements: [
            {
              title: 'Description',
              id: '401cec39-d543-4c95-8cd4-22261e5bef3c',
              type: 'text',
              isEditorActive: false,
              text: '',
              isJustCreated: false,
            },
          ],
        },
      ],
    },
  ],
};
export default board;
