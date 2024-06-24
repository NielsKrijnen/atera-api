export type List<T> = {
  items: T[]
  totalItemCount: number
  page: number
  itemsInPage: number
  totalPages: number
  prevLink: URL | ''
  nextLink: URL | ''
}

export type Agent = {
  MachineID?: string | number
  AgentID?: number
  DeviceGuid?: string
  FolderID?: number
  CustomerID?: number
  CustomerName?: string
  AgentName?: string
  SystemName?: string
  MachineName?: string
  DomainName?: string
  CurrentLoggedUsers?: string
  ComputerDescription?: string
  Monitored?: boolean
  /** Deprecated */
  LastPatchManagementRecieved: undefined
  AgentVersion?: string
  Favorite?: boolean
  ThresholdID?: number
  MonitoredAgentID?: number
  Created?: Date
  Modified?: Date
  Online?: boolean
  ReportedFromIP?: string
  AppViewUrl?: URL
  Motherboard?: string
  Processor?: string
  Memory?: number
  Display?: string
  Sound?: string
  ProcessorCoresCount?: number
  SystemDrive?: string
  ProcessorClock?: string
  Vendor?: string
  VendorSerialNumber?: string
  VendorBrandModel?: string
  ProductName?: string
  BiosManufacturer?: string
  BiosVersion?: string
  BiosReleaseDate?: Date
  MacAddresses?: string[]
  IpAddresses?: string[]
  HardwareDisks?: {
    Drive?: string
    Free?: number
    Used?: number
    Total?: number
  }[]
  BatteryInfo?: {
    Id?: number
    Name?: string
    BatteryHealth?: number
    DesignedCapacity?: number
    FullChargeCapacity?: number
    CycleCount?: number
  }
  OS?: string
  OSType?: string
  WindowsSerialNumber?: string
  Office?: string
  OfficeSP?: string
  OfficeOEM?: boolean
  OfficeSerialNumber?: string
  OSNum?: number
  LastRebootTime?: Date
  OSVersion?: string
  OSBuild?: string
  OfficeFullVersion?: string
  LastLoginUser?: string
}

export type Alert = {
  AlertID?: number
  Code?: number
  Source?: string
  Title?: string
  Severity?: "Information" | "Warning" | "Critical"
  Created?: Date
  SnoozedEndDate?: Date
  DeviceGuid?: string
  AdditionalInfo?: string
  Archived?: boolean
  AlertCategoryID?: "Hardware" | "Disk" | "Availability" | "Performance" | "Exchange" | "General"
  ArchivedDate?: Date
  TicketID?: number
  AlertMessage?: string
  DeviceName?: string
  CustomerID?: number
  CustomerName?: string
  FolderID?: number
  PollingCyclesCount?: number
}

export type Invoice = {
  IsAdhoc?: boolean
  InvoiceId?: string
  InvoiceNumber?: number
  InvoiceNumberAsString?: string
  Total?: number
  Subtotal?: number
  Tax?: number
  TaxPercentage?: number
  InvoiceDate?: Date
  ContractName?: string
  PeriodStartDate?: Date
  PeriodEndDate?: Date
  Currency?: string
  LineItems?: LineItem[]
  From: ContactDetails
  To: ContactDetails
}

export type LineItem = {
  Product?: string
  Description?: string
  Quantity?: number
  Rate?: number
  TaxPercentage?: number
  DiscountPercentage?: number
  Total?: number
  Subtotal?: number
  Tax?: number
  LineIdx?: number
}

export type ContactDetails = {
  CompanyName?: string
  ContactFirstName?: string
  ContactLastName?: string
  ContactFullName?: string
  Address?: string
  State?: string
  Country?: string
  ZipCode?: number
  City?: string
  Phone?: string
  Email?: string
}

export type Contact = {
  EndUserID?: number
  CustomerID?: number
  CustomerName?: string
  Firstname?: string
  Lastname?: string
  JobTitle?: string
  Email: string
  Phone?: string
  MobilePhone?: string
  IsContactPerson: boolean
  InIgnoreMode: boolean
  CreatedOn: Date
  LastModified: Date
}

export type Contract = {
  CustomerID?: number
  CustomerName?: string
  ContractID: number
  ContractName?: string
  Active: boolean
  Default: boolean
  Taxable: boolean
  StartDate: Date
  EndDate: Date
} & ({
  ContractType: "RetainerFlatFee"
  RetainerFlatFeeContract: RetainerFlatFeeContract
} | {
  ContractType: "BlockHours"
  BlockHoursContract: BlockHoursContract
} | {
  ContractType: "Hourly"
  HourlyContract: HourlyContract
} | {
  ContractType: "RemoteMonitoring"
  RemoteMonitoringContract: RemoteMonitoringContract
} | {
  ContractType: "BlockMoney"
  BlockMoneyContract: BlockMoneyContract
} | {
  ContractType: "ProjectOneTimeFee"
  ProjectOneTimeFeeContract: ProjectOneTimeFeeContract
} | {
  ContractType: "ProjectHourlyRate"
  ProjectHourlyRateContract: ProjectHourlyRateContract
} | {
  ContractType: "OnlineBackup"
  OnlineBackupContract: OnlineBackupContract
})

export type RetainerFlatFeeContract = {
  Quantity?: number
  Rate?: Rate
  BillingPeriod?: BillingPeriod
}

export type HourlyContract = {
  PrimaryRate?: Rate
  AdditionalRates?: Rate[]
  BillingPeriod?: BillingPeriod
}

export type BlockHoursContract = {
  HoursIncluded?: number
  PricePerHour?: Rate
  OverageRate?: Rate
  CommitRollover: boolean
  BillingPeriod?: BillingPeriod
}

export type BlockMoneyContract = {
  ContractAmount?: Rate
  PrimaryRate?: Rate
  AdditionalRates?: Rate[]
  CommitRollover: boolean
  BillingPeriod: BillingPeriod
}

export type RemoteMonitoringContract = {
  RatePerDevice?: Rate
  CountBy?: ComputerType
  BillingPeriod?: BillingPeriod
}

export type OnlineBackupContract = {
  RatePerGB?: Rate
  CountBy?: ComputerType
  BillingPeriod?: BillingPeriod
}

export type ProjectOneTimeFeeContract = {
  TotalAmount?: Rate
}

export type ProjectHourlyRateContract = {
  PrimaryRate?: Rate
  AdditionalRates?: Rate[]
}

export type ComputerType = "PCAgents" | "MacAgents" | "ServerAgents" | "OtherDevices" | "AgentsOnly" | "All" | "PCsTotalGB" | "ServersTotalGB" | "TotalGB"
export type BillingPeriod = "EndOfContractDuration" | "Weekly" | "BiWeekly" | "Monthly" | "Quarterly" | "TwiceAYear" | "Yearly" | "OnDemand"

export type Rate = {
  RateID: number
  Amount?: number
  Description?: string
  SKU?: string
  Category?: string
}

export type Customer = {
  CustomerID: number
  CustomerName: string
  CreatedOn: Date
  LastModified: Date
  BusinessNumber?: string
  Domain: string
  Address?: string
  City?: string
  State?: string
  Country?: string
  Phone?: string
  Fax?: string
  Notes?: string
  Logo: URL
  Links?: string
  Longitude: number
  Latitude: number
  ZipCodeStr?: string
}

export type CustomValue = {
  ItemId: number
  Id: string
  FieldName: string
  ValueAsString?: string
  ValueAsDecimal?: number
  ValueAsDateTime?: Date
  ValueAsBool?: boolean
}

export type CustomField = {
  Name: string
  DataType: "Text" | "Boolean" | "Numeric" | "Date" | "Options" | "OptionsWithDependencies"
  Target: "Customer" | "Ticket" | "Contact" | "Contract" | "SLA" | "Agent" | "SNMPDevice" | "HTTPDevice" | "GenericDevice"
  PossibleValues: {
    Value: string
    Text: string
    ParentName: string
  }[]
}

export type KnowledgeBase = {
  KBID: number
  KBTimestamp?: string
  KBContext?: string
  KBProduct?: string
  KBRating_Yes?: number
  KBRating_No?: number
  KBRating_Views?: number
  KBLastModified?: Date
  KBIsPrivate: boolean
  KBStatus?: number
  KBPriority?: number
  KBKeywords?: string
  KBAddress?: string
}

export type Ticket = {
  TicketID: number
  TicketTitle: string
  TicketNumber?: string
  TicketPriority?: "Low" | "Medium" | "High" | "Critical"
  TicketImpact?: "NoImpact" | "SiteDown" | "ServerIssue" | "Minor" | "Major" | "Crisis"
  TicketStatus?: string
  TicketSource?: string
  TicketType?: "Incident" | "Problem" | "Request" | "Change"
  EndUserID?: number
  EndUserEmail?: string
  EndUserFirstName?: string
  EndUserLastName?: string
  EndUserPhone?: string
  TicketResolvedDate?: Date
  TicketCreatedDate: Date
  TechnicianFirstCommentDate?: Date
  FirstResponseDueDate?: Date
  ClosedTicketDueDate?: Date
  FirstComment?: string
  LastEndUserComment?: string
  LastEndUserCommentTimestamp?: Date
  LastTechnicianComment?: string
  LastTechnicianCommentTimestamp?: Date
  OnSiteDurationSeconds?: number
  OnSiteDurationMinutes?: number
  OffSiteDurationSeconds?: number
  OffSiteDurationMinutes?: number
  OnSLADurationSeconds?: number
  OnSLADurationMinutes?: number
  OffSLADurationSeconds?: number
  OffSLADurationMinutes?: number
  TotalDurationSeconds?: number
  TotalDurationMinutes?: number
  CustomerID?: number
  CustomerName?: string
  CustomerBusinessNumber?: string
  TechnicianContactID?: number
  TechnicianFullName?: string
  TechnicianEmail?: string
  ContractID?: number
}

export type Billables = {
  OffSLADurationHours?: number
  OffSiteDurationHours?: number
  OnSLADurationHours?: number
  OnSiteDurationHours?: number
  TotalDurationHours?: number
  ticketId: number
}