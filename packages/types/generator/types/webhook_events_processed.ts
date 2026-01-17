export interface webhook_events_processed {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  event_id: string;
  event_type: string;
  processed_at: string | null;
  error_message: string | null;
  retry_count: number;
  status: string;
}

export interface webhook_events_processedCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  event_id: string;
  event_type: string;
  processed_at?: string | null;
  error_message?: string | null;
  retry_count?: number;
  status?: string;
}

export type webhook_events_processedUpdateInput = Partial<webhook_events_processedCreateInput>;

