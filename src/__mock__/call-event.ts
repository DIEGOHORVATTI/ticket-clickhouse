const callEvent = [
  {
    _id: 'c8d59c0b-0c6d-41a0-9cc5-f8891b576d4b',
    domain: 'devpl3',
    event: 'tktNewCall',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    externalCallId: '21/01/25 11:55:24 010A 010F/00',
    iterationLevel: 1,
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    media: {
      type: 'VOICE'
    },
    interlocutor: {
      identity: '1112075'
    },
    flgConsult: false,
    flgIncoming: true,
    associatedData: '',
    protocol: '2025012100000004',
    eventDate: {
      startDt: "ISODate('2025-01-21T11:55:24.000Z')"
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: 'a8a1fbc2-2419-491e-8afd-b223ed7a9325',
    domain: 'devpl3',
    event: 'tktServiceQueue',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    eventDate: {
      startDt: "ISODate('2025-01-21T11:55:24.000Z')"
    },
    queuePosition: 1,
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: 'dfc80b49-2bfe-4364-959f-5f62c46c46c7',
    domain: 'devpl3',
    event: 'tktServiceQueue',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    eventDate: {
      endDt: "ISODate('2025-01-21T11:55:24.000Z')",
      duration: 0
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: '28d99962-3246-4db8-8e3c-b9e5af041901',
    domain: 'devpl3',
    event: 'tktRing',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    eventDate: {
      startDt: "ISODate('2025-01-21T11:55:24.000Z')"
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: 'e8270547-86de-48b5-bc6b-5726b8acccc3',
    domain: 'devpl3',
    event: 'tktRing',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    flgPickUp: true,
    eventDate: {
      endDt: "ISODate('2025-01-21T11:55:27.000Z')",
      duration: 3
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: '40e4ee76-3651-4bf1-b3be-33217eda69ca',
    domain: 'devpl3',
    event: 'tktTalking',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    flgRecord: false,
    eventDate: {
      startDt: "ISODate('2025-01-21T11:55:27.000Z')"
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: '01bc06f1-307f-4a52-b0de-1c46e580e522',
    domain: 'devpl3',
    event: 'tktTalking',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    flgRecord: true,
    eventDate: {
      endDt: "ISODate('2025-01-21T11:55:33.000Z')",
      duration: 6
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: '4123540e-fa52-4c43-94bf-54686ce955b1',
    domain: 'devpl3',
    event: 'tktClassification',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    eventDate: {
      startDt: "ISODate('2025-01-21T11:55:33.000Z')"
    },
    classification: {
      id: null,
      subLevelId: null
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: 'a545760a-245e-4160-85a2-20a2fae5e72c',
    domain: 'devpl3',
    event: 'tktCallEnd',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    iterationLevel: 1,
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    interlocutor: {
      identity: '1112075'
    },
    flgConsult: false,
    flgRecord: true,
    flgAfterService: false,
    eventDate: {
      endDt: "ISODate('2025-01-21T11:55:33.000Z')"
    },
    hookBy: 'B',
    endReason: 'FINISHED_HANDLED',
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: 'cb7e11e0-4108-4fc3-aab6-16f38f3cd9b0',
    domain: 'devpl3',
    event: 'tktClassification',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    eventDate: {
      endDt: "ISODate('2025-01-21T11:55:38.000Z')",
      duration: 5
    },
    classification: {
      id: '98325f6c-9510-4f46-b894-b24a1bdb0847',
      subLevelId: null
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: '12588c27-e449-4cf4-abcc-e1a8c8f94cf8',
    domain: 'devpl3',
    event: 'tktAgentAfterWorking',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    eventDate: {
      startDt: "ISODate('2025-01-21T11:55:38.000Z')"
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: 'f02e63fc-bae4-4016-ab82-d233e77f2a04',
    domain: 'devpl3',
    event: 'tktAgentAfterWorking',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    eventDate: {
      endDt: "ISODate('2025-01-21T11:55:41.000Z')",
      duration: 3
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  },

  {
    _id: 'a07f210d-fd01-43ca-a3e3-fb94f8c55d85',
    domain: 'devpl3',
    event: 'tktAgentCallEnd',
    callId: '4c716692-6dc9-4a23-a341-0a7291ac4809',
    serviceId: '83dc26c7-5900-4a72-ad2a-9f317b052468',
    expectedServiceTime: 0,
    attendant: {
      type: 'AGENT',
      id: '355',
      flgSource: false
    },
    eventDate: {
      endDt: "ISODate('2025-01-21T11:55:41.000Z')",
      duration: 17
    },
    contact: 'f00ee6b9-e852-44a4-a66d-6035dab9ab28'
  }
]
