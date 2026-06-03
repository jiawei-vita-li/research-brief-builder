"use client";

import { EditableField } from "@/components/shared/editable-field";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { STR } from "@/lib/i18n/strings";
import type { OutreachEmailDraft } from "@/lib/types";

export function OutreachEmailView({
  email,
  onChange,
}: {
  email: OutreachEmailDraft;
  onChange: (email: OutreachEmailDraft) => void;
}) {
  const patch = (partial: Partial<OutreachEmailDraft>) =>
    onChange({ ...email, ...partial });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base">{STR.outreach.cardTitle}</CardTitle>
          <Badge variant="outline" className="font-normal">
            {STR.workspace.draftBadge}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{STR.outreach.reviewHint}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <EditableField label={STR.outreach.subject} value={email.subject} onChange={(subject) => patch({ subject })} rows={1} />
        <EditableField label={STR.outreach.greeting} value={email.greeting} onChange={(greeting) => patch({ greeting })} rows={1} />
        <EditableField label={STR.outreach.opening} value={email.opening} onChange={(opening) => patch({ opening })} rows={4} />
        <EditableField
          label={STR.outreach.paperParagraph}
          value={email.paper_specific_paragraph}
          onChange={(paper_specific_paragraph) => patch({ paper_specific_paragraph })}
          rows={5}
        />
        <EditableField
          label={STR.outreach.selfPositioning}
          value={email.self_positioning_paragraph}
          onChange={(self_positioning_paragraph) => patch({ self_positioning_paragraph })}
          rows={5}
        />
        <EditableField
          label={STR.outreach.proposedContribution}
          value={email.proposed_RA_contribution}
          onChange={(proposed_RA_contribution) => patch({ proposed_RA_contribution })}
          rows={4}
        />
        <EditableField
          label={STR.outreach.availability}
          value={email.availability_or_next_step}
          onChange={(availability_or_next_step) => patch({ availability_or_next_step })}
          rows={3}
        />
        <EditableField label={STR.outreach.closing} value={email.closing} onChange={(closing) => patch({ closing })} rows={3} />

        <Separator />

        <EditableField
          label={STR.outreach.fullEmail}
          value={email.full_email}
          onChange={(full_email) => patch({ full_email })}
          rows={14}
          mono
        />
      </CardContent>
    </Card>
  );
}
