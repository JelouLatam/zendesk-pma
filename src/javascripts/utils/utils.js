export const parsePayload = (ticket) => {
  try {
    const {
      comment,
      event,
      id,
      priority,
      status,
      tags,
      type,
      updatedAt,
      assignee: { user } = {},
      brand: { subdomain, id: brandId } = {},
      requester: {
        externalId: requesterExternalId,
        id: requesterId,
        name: requesterName,
      } = {},
    } = ticket || {};
    const { id: agentId, name: agentName } = user || {};
    const isStatusChange = event === "ticket-event";

    return {
      subdomain,
      brandId,
      bubble: {
        attachments: isStatusChange ? "" : comment.attachments,
        commentHtml: isStatusChange ? "" : comment.text,
        latestpublic: isStatusChange ? "" : comment.text,
        latestPublicComment: isStatusChange ? "" : comment.text,
      },
      createdAt: updatedAt,
      event,
      recipient: {
        externalId: requesterExternalId,
        firstName: _getName(requesterName),
        id: requesterId,
        lastName: _getLastName(requesterName),
      },
      sender: {
        agentId: agentId,
        firstName: _getName(agentName),
        lastName: _getLastName(agentName),
      },
      subdomain,
      ticket: {
        id,
        priority,
        status,
        tags,
        type,
      },
    };
  } catch (e) {
    console.error("=== parser error", e.message);
    return {};
  }
};

function _getName(data) {
  if (!data) {
    return "";
  }
  return data.split(" ")[0];
}

function _getLastName(data) {
  if (!data) {
    return "";
  }
  const lastname = data.split(" ");
  delete lastname[0];
  return lastname.join(" ").trim();
}
