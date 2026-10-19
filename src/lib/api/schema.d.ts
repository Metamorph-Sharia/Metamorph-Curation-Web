// Generated from the curation API's OpenAPI contract by `npm run api:types`. Do not edit.
export interface paths {
    "/api/v1/auth/session": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Session */
        get: operations["session_api_v1_auth_session_get"];
        put?: never;
        /** Sign In */
        post: operations["sign_in_api_v1_auth_session_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search */
        get: operations["search_api_v1_documents_get"];
        put?: never;
        /** Add Document */
        post: operations["add_document_api_v1_documents_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Document */
        get: operations["document_api_v1_documents__document_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/citations/{citation_id}/link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Link Citation */
        post: operations["link_citation_api_v1_documents__document_id__citations__citation_id__link_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/conflicts/{conflict_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Resolve Conflict */
        post: operations["resolve_conflict_api_v1_documents__document_id__conflicts__conflict_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/content/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Content */
        get: operations["content_api_v1_documents__document_id__content__sha256__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/corrections": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Correct */
        post: operations["correct_api_v1_documents__document_id__corrections_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/corrections/{field}/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Correction */
        post: operations["withdraw_correction_api_v1_documents__document_id__corrections__field__withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/id": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Assign Id
         * @description Answers the document under its new ID.
         */
        post: operations["assign_id_api_v1_documents__document_id__id_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/restore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Restore */
        post: operations["restore_api_v1_documents__document_id__restore_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/suppression": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Suppress */
        post: operations["suppress_api_v1_documents__document_id__suppression_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/approval": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Approve */
        post: operations["approve_api_v1_documents__document_id__texts__text_sha256__approval_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/approval/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Approval */
        post: operations["withdraw_approval_api_v1_documents__document_id__texts__text_sha256__approval_withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/correction": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Correction */
        get: operations["correction_api_v1_documents__document_id__texts__text_sha256__correction_get"];
        put?: never;
        /** Correct Text */
        post: operations["correct_text_api_v1_documents__document_id__texts__text_sha256__correction_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/correction/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Text Correction */
        post: operations["withdraw_text_correction_api_v1_documents__document_id__texts__text_sha256__correction_withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/editable": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Editable */
        get: operations["editable_api_v1_documents__document_id__texts__text_sha256__editable_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/held": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Held */
        get: operations["held_api_v1_held_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Overview */
        get: operations["overview_api_v1_overview_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/reviews": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Reviews */
        get: operations["reviews_api_v1_reviews_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/reviews/{item_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Decide Review */
        post: operations["decide_review_api_v1_reviews__item_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/uploads": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Upload */
        post: operations["upload_api_v1_uploads_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** BundleRow */
        BundleRow: {
            /** Connector */
            connector: string;
            /** Loaded */
            loaded: number;
            /** Quarantined */
            quarantined: number;
            /**
             * Received At
             * Format: date-time
             */
            received_at: string;
            /** Run Id */
            run_id: string;
            /** State */
            state: string;
            /** Unchanged */
            unchanged: number;
        };
        /**
         * Check
         * @enum {string}
         */
        Check: "identity" | "text" | "parsed" | "structure";
        /** CheckRow */
        CheckRow: {
            /** Detail */
            detail: string;
            /** Name */
            name: string;
            /** Severity */
            severity: string;
        };
        /** CitationRow */
        CitationRow: {
            /** From Address */
            from_address: string | null;
            /** Id */
            id: number;
            /** Relation */
            relation: string;
            /** Target Id */
            target_id: string | null;
            /** Target Text */
            target_text: string;
        };
        /** CitationTarget */
        CitationTarget: {
            /**
             * Reason
             * @default
             */
            reason: string;
            /** Target Id */
            target_id: string;
        };
        /** ConflictDecision */
        ConflictDecision: {
            /** Decision */
            decision: string;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** ConflictRow */
        ConflictRow: {
            /** Correction */
            correction: unknown;
            /**
             * Detected At
             * Format: date-time
             */
            detected_at: string;
            /** Field */
            field: string;
            /** Id */
            id: number;
            /** Source Value */
            source_value: unknown;
        };
        /** ContentRow */
        ContentRow: {
            approval?: components["schemas"]["CuratorNote"] | null;
            correction?: components["schemas"]["CuratorNote"] | null;
            /** Detail */
            detail: string;
            /**
             * Editable
             * @default false
             */
            editable: boolean;
            /** Label */
            label: string;
            /** Media Type */
            media_type: string;
            /**
             * Problems
             * @default []
             */
            problems: string[];
            /** Sha256 */
            sha256: string;
        };
        /** CorrectionDiff */
        CorrectionDiff: {
            /** Corrected */
            corrected: string;
            correction: components["schemas"]["CorrectionView"];
            /** Diff */
            diff: string[];
            /** Source */
            source: string;
        };
        /** CorrectionRow */
        CorrectionRow: {
            /** Author */
            author: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Reason */
            reason: string;
            /** Source Value */
            source_value: unknown;
            /** Value */
            value: unknown;
        };
        /**
         * CorrectionView
         * @description A curator's correction of a text (the latest one), to compare with the source's wording.
         */
        CorrectionView: {
            /** Active */
            active: boolean;
            /** Citation */
            citation: string;
            /** Corrected Storage Key */
            corrected_storage_key: string;
            /** Current */
            current: boolean;
            /** Document Id */
            document_id: string;
            note: components["schemas"]["CuratorNote"];
            /** Sha256 */
            sha256: string;
            /** Source Storage Key */
            source_storage_key: string;
        };
        /** Curator */
        Curator: {
            /** Display Name */
            display_name: string;
            /** Username */
            username: string;
        };
        /** CuratorNote */
        CuratorNote: {
            /** Author */
            author: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Reason */
            reason: string;
        };
        /** Dashboard */
        Dashboard: {
            /** Checks */
            checks: components["schemas"]["CheckRow"][];
            /** Documents By Issuer */
            documents_by_issuer: [
                string,
                number
            ][];
            /** Health Status */
            health_status: string | null;
            /** Health Taken At */
            health_taken_at: string | null;
            /**
             * Held
             * @default 0
             */
            held: number;
            /**
             * Held Published
             * @default 0
             */
            held_published: number;
            /** Open Reviews */
            open_reviews: [
                string,
                number
            ][];
            /** Published */
            published: number;
            /** Recent Bundles */
            recent_bundles: components["schemas"]["BundleRow"][];
        };
        /** DocumentRow */
        DocumentRow: {
            /** Citation */
            citation: string;
            /** Id */
            id: string;
            /** Issuer */
            issuer: string;
            /** Kind */
            kind: string;
            /** Status */
            status: string;
            /** Suppressed */
            suppressed: boolean;
            /** Title */
            title: string;
        };
        /** DocumentView */
        DocumentView: {
            /** Conflicts */
            conflicts: components["schemas"]["ConflictRow"][];
            /** Fields */
            fields: components["schemas"]["FieldRow"][];
            /** Files */
            files: components["schemas"]["ContentRow"][];
            /**
             * Hold
             * @default []
             */
            hold: components["schemas"]["HoldReason"][];
            /** Id Confidence */
            id_confidence: string;
            /**
             * Lapsed Corrections
             * @default []
             */
            lapsed_corrections: string[];
            /** Links In */
            links_in: components["schemas"]["LinkRow"][];
            /** Links Out */
            links_out: components["schemas"]["LinkRow"][];
            /** Open Citations */
            open_citations: components["schemas"]["CitationRow"][];
            /** Open Reviews */
            open_reviews: components["schemas"]["ReviewRow"][];
            /** Provisions */
            provisions: components["schemas"]["ProvisionRow"][];
            /** Provisions Total */
            provisions_total: number;
            /** Published At */
            published_at?: string | null;
            /** Sources */
            sources: components["schemas"]["SourceRow"][];
            /** Status History */
            status_history: components["schemas"]["StatusRow"][];
            summary: components["schemas"]["DocumentRow"];
            suppression: components["schemas"]["SuppressionRow"] | null;
            /** Texts */
            texts: components["schemas"]["ContentRow"][];
        };
        /** Done */
        Done: {
            /** Done */
            done: string;
        };
        /**
         * EditableText
         * @description A current main text, to correct: its effective wording is at `storage_key`.
         */
        EditableText: {
            /** Citation */
            citation: string;
            /** Corrected */
            corrected: boolean;
            /** Document Id */
            document_id: string;
            /** Paged */
            paged: boolean;
            /** Sha256 */
            sha256: string;
            /** Storage Key */
            storage_key: string;
        };
        /** FieldCorrection */
        FieldCorrection: {
            /** Field */
            field: string;
            /**
             * Reason
             * @default
             */
            reason: string;
            /**
             * Value
             * @default
             */
            value: string;
        };
        /**
         * FieldRow
         * @description One overridable field: what the knowledge layer sees, the registry's value, and each source's.
         */
        FieldRow: {
            /** By Source */
            by_source: [
                string,
                unknown
            ][];
            correction: components["schemas"]["CorrectionRow"] | null;
            /** Effective */
            effective: unknown;
            /** Field */
            field: string;
            /** Registry */
            registry: unknown;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** HeldPage */
        HeldPage: {
            /** Check */
            check: string | null;
            /** Counts */
            counts: [
                string,
                number
            ][];
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["HeldRow"][];
            /** Total */
            total: number;
        };
        /** HeldRow */
        HeldRow: {
            /** Document Id */
            document_id: string;
            /**
             * Held Since
             * Format: date-time
             */
            held_since: string;
            /** Published At */
            published_at: string | null;
            /** Reasons */
            reasons: components["schemas"]["HoldReason"][];
            /** Title */
            title: string;
        };
        /** HoldReason */
        HoldReason: {
            check: components["schemas"]["Check"];
            /** Detail */
            detail: string;
        };
        /** Link */
        Link: {
            /** Url */
            url: string;
        };
        /** LinkRow */
        LinkRow: {
            /** Document Id */
            document_id: string;
            /** Document Title */
            document_title: string | null;
            /** From Address */
            from_address: string | null;
            /** Method */
            method: string;
            /** To Address */
            to_address: string | null;
            /** Type */
            type: string;
        };
        /**
         * NewDocument
         * @description A document no connector holds (domain/manual.py), its file uploaded first (POST /uploads).
         */
        NewDocument: {
            /** Citation */
            citation: string;
            /** Document Id */
            document_id: string;
            /**
             * Effective On
             * @default
             */
            effective_on: string;
            /**
             * Enacted On
             * @default
             */
            enacted_on: string;
            /** File Name */
            file_name: string;
            /** Kind */
            kind: string;
            /**
             * Language
             * @default id
             */
            language: string;
            /**
             * Media Type
             * @default application/octet-stream
             */
            media_type: string;
            /**
             * Promulgated On
             * @default
             */
            promulgated_on: string;
            /**
             * Reason
             * @default
             */
            reason: string;
            /**
             * Rights
             * @default public
             */
            rights: string;
            /** Source Url */
            source_url: string;
            /** Status */
            status: string;
            /**
             * Text
             * @default
             */
            text: string;
            /** Title */
            title: string;
            /** Upload Key */
            upload_key: string;
        };
        /** NewId */
        NewId: {
            /** New Id */
            new_id: string;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** ProvisionRow */
        ProvisionRow: {
            /** Address */
            address: string;
            /** Depth */
            depth: number;
            /** Heading */
            heading: string | null;
            /** Kind */
            kind: string;
            /** Label */
            label: string;
            /** Page Start */
            page_start: number | null;
            /** Valid To */
            valid_to: string | null;
        };
        /** Reason */
        Reason: {
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** ReviewDecision */
        ReviewDecision: {
            /**
             * Reason
             * @default
             */
            reason: string;
            /** State */
            state: string;
        };
        /** ReviewPage */
        ReviewPage: {
            /** Kind */
            kind: string;
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["ReviewRow"][];
            /** Total */
            total: number;
        };
        /** ReviewRow */
        ReviewRow: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Document Id */
            document_id: string | null;
            /** Document Title */
            document_title: string | null;
            /** Id */
            id: number;
            /** Kind */
            kind: string;
            /** Subject */
            subject: {
                [key: string]: unknown;
            };
            /** Summary */
            summary: string;
        };
        /** Session */
        Session: {
            curator: components["schemas"]["Curator"];
            /**
             * Expires At
             * Format: date-time
             */
            expires_at: string;
            /** Token */
            token: string;
        };
        /** SignIn */
        SignIn: {
            /** Password */
            password: string;
            /** Username */
            username: string;
        };
        /** SourceRow */
        SourceRow: {
            /** Connector */
            connector: string;
            /**
             * Fetched At
             * Format: date-time
             */
            fetched_at: string;
            /** Missing Since */
            missing_since: string | null;
            /** Source Id */
            source_id: string;
            /** Url */
            url: string;
        };
        /** StatusRow */
        StatusRow: {
            /** Address */
            address: string | null;
            /** Effective From */
            effective_from: string | null;
            /** Source */
            source: string;
            /** Status */
            status: string;
        };
        /** Suppression */
        Suppression: {
            /**
             * Confirm
             * @default false
             */
            confirm: boolean;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** SuppressionRow */
        SuppressionRow: {
            /** Author */
            author: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Reason */
            reason: string;
        };
        /** TextToEdit */
        TextToEdit: {
            text: components["schemas"]["EditableText"];
            /** Wording */
            wording: string;
        };
        /** Upload */
        Upload: {
            /** File Name */
            file_name: string;
            /**
             * Media Type
             * @default application/octet-stream
             */
            media_type: string;
        };
        /** UploadLink */
        UploadLink: {
            /** Upload Key */
            upload_key: string;
            /** Url */
            url: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Context */
            ctx?: Record<string, never>;
            /** Input */
            input?: unknown;
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** Wording */
        Wording: {
            /**
             * Reason
             * @default
             */
            reason: string;
            /** Wording */
            wording: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    session_api_v1_auth_session_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Curator"];
                };
            };
        };
    };
    sign_in_api_v1_auth_session_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignIn"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Session"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    search_api_v1_documents_get: {
        parameters: {
            query?: {
                q?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentRow"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    add_document_api_v1_documents_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewDocument"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    document_api_v1_documents__document_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    link_citation_api_v1_documents__document_id__citations__citation_id__link_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                citation_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CitationTarget"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    resolve_conflict_api_v1_documents__document_id__conflicts__conflict_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                conflict_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ConflictDecision"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    content_api_v1_documents__document_id__content__sha256__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Link"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    correct_api_v1_documents__document_id__corrections_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FieldCorrection"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_correction_api_v1_documents__document_id__corrections__field__withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                field: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    assign_id_api_v1_documents__document_id__id_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewId"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    restore_api_v1_documents__document_id__restore_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    suppress_api_v1_documents__document_id__suppression_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Suppression"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    approve_api_v1_documents__document_id__texts__text_sha256__approval_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_approval_api_v1_documents__document_id__texts__text_sha256__approval_withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    correction_api_v1_documents__document_id__texts__text_sha256__correction_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CorrectionDiff"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    correct_text_api_v1_documents__document_id__texts__text_sha256__correction_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Wording"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_text_correction_api_v1_documents__document_id__texts__text_sha256__correction_withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    editable_api_v1_documents__document_id__texts__text_sha256__editable_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TextToEdit"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    held_api_v1_held_get: {
        parameters: {
            query?: {
                check?: string;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HeldPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    overview_api_v1_overview_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Dashboard"];
                };
            };
        };
    };
    reviews_api_v1_reviews_get: {
        parameters: {
            query?: {
                kind?: string;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReviewPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    decide_review_api_v1_reviews__item_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                item_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReviewDecision"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Done"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    upload_api_v1_uploads_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Upload"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UploadLink"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
