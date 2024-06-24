import { Agent, Alert, Billables, Contact, Contract, CustomField, CustomValue, Customer, Invoice, KnowledgeBase, List, Ticket } from "./types";
export * from "./types";
import { rebuildDocument } from "./utils";

export function createAteraClient(apiKey: string) {
  const BASE_URL = "https://app.atera.com/api/v3";
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey
  }

  async function GET<T extends Record<string, any>>(path: string, params?: Record<string, any>) {
    const url = new URL(BASE_URL + path);
    if (params) {
      for (const param of Object.keys(params)) {
        if (params[param]) url.searchParams.append(param, params[param].toString());
      }
    }

    const response = await fetch(url, {
      method: "GET",
      headers
    });

    const json = await response.json();

    return rebuildDocument(json) as T;
  }

  async function POST(path: string, body: Record<string, any>) {
    const response = await fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })

    const json = await response.json();

    return rebuildDocument(json) as { ActionID: number };
  }

  async function PUT<T extends Record<string, any> = { ActionID: number }>(path: string, body: Record<string, any>) {
    const response = await fetch(BASE_URL + path, {
      method: "PUT",
      headers,
      body: JSON.stringify(body)
    })

    const json = await response.json();

    return rebuildDocument(json) as T;
  }

  function DELETE(path: string) {
    return fetch(BASE_URL + path, {
      method: "DELETE",
      headers
    }).then(response => response.json()) as Promise<{}>;
  }

  return {
    agent: {
      list(page: number = 1, itemsInPage: number = 20) {
        return GET<List<Agent>>("/agents", { page, itemsInPage });
      },
      listCustomer(customerId: string, page: number = 1, itemsInPage: number = 20) {
        return GET<List<Agent>>(`/agents/customer/${customerId}`, { page, itemsInPage });
      },
      listMachineName(machineName: string, page: number = 1, itemsInPage: number = 20) {
        return GET<List<Agent>>(`/agents/machine/${machineName}`, { page, itemsInPage });
      },
      get(agentId: number) {
        return GET<Agent>(`/agents/${agentId}`);
      },
      delete(agentId: string) {
        return DELETE(`/agents/${agentId}`);
      }
    },
    alert: {
      list(page: number = 1, itemsInPage: number = 20, alertStatus?: "Open" | "Resolved" | "Snoozed") {
        return GET<List<Alert>>("/alerts", { page, itemsInPage, alertStatus });
      },
      create(alert: Alert) {
        return POST("/alerts", alert);
      },
      delete(alertId: string) {
        return DELETE(`/alerts/${alertId}`);
      },
      get(alertId: string) {
        return GET<Alert>(`/alerts/${alertId}`);
      }
    },
    billing: {
      list(page: number = 1, itemsInPage: number = 20) {
        return GET<List<Invoice>>("/billing/invoices", { page, itemsInPage });
      },
      get(invoiceNumber: number) {
        return GET<Invoice>(`/billing/invoice/${invoiceNumber}`);
      }
    },
    contact: {
      list(page: number = 1, itemsInPage: number = 20, emailSearch?: string, phoneSearch?: string) {
        return GET<List<Contact>>("/contacts", {
          page, itemsInPage,
          "searchOptions.email": emailSearch,
          "searchOptions.phone": phoneSearch
        })
      },
      create(contact: Omit<Contact, "EndUserID" | "LastModified">) {
        return POST("/contacts", contact);
      },
      delete(contactId: number) {
        return DELETE(`/contacts/${contactId}`);  
      },
      get(contactId: number) {
        return GET<Contact>(`/contacts/${contactId}`);
      },
      update(contactId: number, contact: Partial<Omit<Contact, "EndUserID" | "CustomerID" | "CustomerName" | "Email" | "CreatedOn" | "LastModified">>) {
        return PUT(`/contacts/${contactId}`, contact);
      }
    },
    contracts: {
      list(page: number = 1, itemsInPage: number = 20) {
        return GET<List<Contract>>("/contracts", { page, itemsInPage });
      },
      listCustomer(customerId: number, page: number = 1, itemsInPage: number = 20) {
        return GET<List<Contract>>(`/contracts/customer/${customerId}`, { page, itemsInPage });
      },
      get(contractId: number) {
        return GET<Contract>(`/contracts/${contractId}`);
      }
    },
    customer: {
      list(page: number = 1, itemsInPage: number = 20) {
        return GET<List<Customer>>("/customers", { page, itemsInPage });
      },
      create(customer: Record<string, any>) {
        return POST("/customers", customer);
      },
      delete(customerId: number) {
        return DELETE(`/customers/${customerId}`);
      },
      get(customerId: number) {
        return GET<Customer>(`/customers/${customerId}`);
      },
      update(customerId: number, customer: Record<string, any>) {
        return PUT(`/customers/${customerId}`, customer);
      },
      createFolder(folder: { Name: string, CustomerId: number, ThresholdId: number }) {
        return POST("/customers/folders", folder);
      },
      createAttachment(attachment: { CustomerID: number, Name: string, ContentBased64: string }) {
        return POST("/customers/attachments", attachment);
      }
    },
    customValues: {
      get(rowId: number) {
        return GET<CustomValue[]>(`/customvalues/${rowId}`);
      },
      getTicket(ticketId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/ticketfield/${ticketId}/${fieldName}`);
      },
      updateTicketValue(ticketId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/ticketfield/${ticketId}/${fieldName}`, { Value: value });
      },
      getCustomer(customerId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/customerfield/${customerId}/${fieldName}`);
      },
      updateCustomerValue(customerId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/customerfield/${customerId}/${fieldName}`, { Value: value });
      },
      getContact(contactId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/contactfield/${contactId}/${fieldName}`);
      },
      updateContactValue(contactId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/contactfield/${contactId}/${fieldName}`, { Value: value });
      },
      getContract(contractId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/contractfield/${contractId}/${fieldName}`);
      },
      updateContractValue(contractId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/contractfield/${contractId}/${fieldName}`, { Value: value });
      },
      getSLA(slaId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/slafield/${slaId}/${fieldName}`);
      },
      updateSLAValue(slaId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/slafield/${slaId}/${fieldName}`, { Value: value });
      },
      getAgent(agentId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/agentfield/${agentId}/${fieldName}`);
      },
      updateAgentValue(agentId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/agentfield/${agentId}/${fieldName}`, { Value: value });
      },
      getSNMP(snmpDeviceId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/snmpfield/${snmpDeviceId}/${fieldName}`);
      },
      updateSNMPValue(snmpDeviceId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/snmpfield/${snmpDeviceId}/${fieldName}`, { Value: value });
      },
      getTCP(tcpDeviceId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/tcpfield/${tcpDeviceId}/${fieldName}`);
      },
      updateTCPValue(tcpDeviceId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/tcpfield/${tcpDeviceId}/${fieldName}`, { Value: value });
      },
      getHTTP(httpDeviceId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/httpfield/${httpDeviceId}/${fieldName}`);
      },
      updateHTTPValue(httpDeviceId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/httpfield/${httpDeviceId}/${fieldName}`, { Value: value });
      },
      getGeneric(genericDeviceId: number, fieldName: string) {
        return GET<CustomValue[]>(`/customvalues/genericfield/${genericDeviceId}/${fieldName}`);
      },
      updateGenericValue(genericDeviceId: number, fieldName: string, value: string) {
        return PUT<{}>(`/customvalues/genericfield/${genericDeviceId}/${fieldName}`, { Value: value });
      },
      listCustomFields() {
        return GET<CustomField[]>(`/customvalues/customfields`);
      }
    },
    device: {

    },
    knowledgeBase: {
      list(page: number = 1, itemsInPage: number = 20) {
        return GET<List<KnowledgeBase>>("/knowledgebases", { page, itemsInPage });
      }
    },
    rates: {

    },
    ticket: {
      list(page: number = 1, itemsInPage: number = 20, params?: { customerId?: number, ticketStatus?: string }) {
        return GET<List<Ticket>>("/tickets", {
          page, itemsInPage,
          ...params
        });
      },
      create(ticket: Pick<Ticket, "TicketTitle" | "TicketPriority" | "TicketImpact" | "TicketStatus" | "TicketType" | "EndUserID" | "EndUserFirstName" | "EndUserLastName" | "EndUserEmail" | "TechnicianContactID"> & { Description: string }) {
        return POST("/tickets", ticket);
      },
      delete(ticketId: number) {
        return DELETE(`/tickets/${ticketId}`);
      },
      get(ticketId: number) {
        return GET<Ticket>(`/tickets/${ticketId}`);
      },
      update(ticketId: number, ticket: Pick<Ticket, "TicketTitle" | "TicketStatus" | "TicketType" | "TicketPriority" | "TicketImpact" | "TechnicianContactID">) {
        return PUT(`/tickets/${ticketId}`, ticket);
      },
      listResolvedAndClosed(page: number = 1, itemsInPage: number = 20) {
        return GET<List<Ticket>>("/tickets/statusmodified", { page, itemsInPage });
      },
      getBillableDuration(ticketId: number) {
        return GET<Billables>(`/tickets/${ticketId}/billableduration`);
      },
      getNonBillableDuration(ticketId: number) {
        return GET<Billables>(`/tickets/${ticketId}/nonbillableduration`);
      },
      getWorkhours(ticketId: number) {
        return GET<{
          TicketID: number,
          Billable: Billables,
          NonBillable: Billables
        }>(`/tickets/${ticketId}/workhours`);
      }
    }
  } as const;
}