import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TimeEntryModel = runtime.Types.Result.DefaultSelection<Prisma.$TimeEntryPayload>;
export type AggregateTimeEntry = {
    _count: TimeEntryCountAggregateOutputType | null;
    _avg: TimeEntryAvgAggregateOutputType | null;
    _sum: TimeEntrySumAggregateOutputType | null;
    _min: TimeEntryMinAggregateOutputType | null;
    _max: TimeEntryMaxAggregateOutputType | null;
};
export type TimeEntryAvgAggregateOutputType = {
    id: number | null;
    hours: number | null;
};
export type TimeEntrySumAggregateOutputType = {
    id: number | null;
    hours: number | null;
};
export type TimeEntryMinAggregateOutputType = {
    id: number | null;
    date: Date | null;
    project: string | null;
    hours: number | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TimeEntryMaxAggregateOutputType = {
    id: number | null;
    date: Date | null;
    project: string | null;
    hours: number | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TimeEntryCountAggregateOutputType = {
    id: number;
    date: number;
    project: number;
    hours: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TimeEntryAvgAggregateInputType = {
    id?: true;
    hours?: true;
};
export type TimeEntrySumAggregateInputType = {
    id?: true;
    hours?: true;
};
export type TimeEntryMinAggregateInputType = {
    id?: true;
    date?: true;
    project?: true;
    hours?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TimeEntryMaxAggregateInputType = {
    id?: true;
    date?: true;
    project?: true;
    hours?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TimeEntryCountAggregateInputType = {
    id?: true;
    date?: true;
    project?: true;
    hours?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TimeEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TimeEntryCountAggregateInputType;
    _avg?: TimeEntryAvgAggregateInputType;
    _sum?: TimeEntrySumAggregateInputType;
    _min?: TimeEntryMinAggregateInputType;
    _max?: TimeEntryMaxAggregateInputType;
};
export type GetTimeEntryAggregateType<T extends TimeEntryAggregateArgs> = {
    [P in keyof T & keyof AggregateTimeEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTimeEntry[P]> : Prisma.GetScalarType<T[P], AggregateTimeEntry[P]>;
};
export type TimeEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithAggregationInput | Prisma.TimeEntryOrderByWithAggregationInput[];
    by: Prisma.TimeEntryScalarFieldEnum[] | Prisma.TimeEntryScalarFieldEnum;
    having?: Prisma.TimeEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TimeEntryCountAggregateInputType | true;
    _avg?: TimeEntryAvgAggregateInputType;
    _sum?: TimeEntrySumAggregateInputType;
    _min?: TimeEntryMinAggregateInputType;
    _max?: TimeEntryMaxAggregateInputType;
};
export type TimeEntryGroupByOutputType = {
    id: number;
    date: Date;
    project: string;
    hours: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    _count: TimeEntryCountAggregateOutputType | null;
    _avg: TimeEntryAvgAggregateOutputType | null;
    _sum: TimeEntrySumAggregateOutputType | null;
    _min: TimeEntryMinAggregateOutputType | null;
    _max: TimeEntryMaxAggregateOutputType | null;
};
type GetTimeEntryGroupByPayload<T extends TimeEntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TimeEntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TimeEntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TimeEntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TimeEntryGroupByOutputType[P]>;
}>>;
export type TimeEntryWhereInput = {
    AND?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    OR?: Prisma.TimeEntryWhereInput[];
    NOT?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    id?: Prisma.IntFilter<"TimeEntry"> | number;
    date?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    project?: Prisma.StringFilter<"TimeEntry"> | string;
    hours?: Prisma.FloatFilter<"TimeEntry"> | number;
    description?: Prisma.StringFilter<"TimeEntry"> | string;
    createdAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
};
export type TimeEntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    project?: Prisma.SortOrder;
    hours?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TimeEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    OR?: Prisma.TimeEntryWhereInput[];
    NOT?: Prisma.TimeEntryWhereInput | Prisma.TimeEntryWhereInput[];
    date?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    project?: Prisma.StringFilter<"TimeEntry"> | string;
    hours?: Prisma.FloatFilter<"TimeEntry"> | number;
    description?: Prisma.StringFilter<"TimeEntry"> | string;
    createdAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TimeEntry"> | Date | string;
}, "id">;
export type TimeEntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    project?: Prisma.SortOrder;
    hours?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TimeEntryCountOrderByAggregateInput;
    _avg?: Prisma.TimeEntryAvgOrderByAggregateInput;
    _max?: Prisma.TimeEntryMaxOrderByAggregateInput;
    _min?: Prisma.TimeEntryMinOrderByAggregateInput;
    _sum?: Prisma.TimeEntrySumOrderByAggregateInput;
};
export type TimeEntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.TimeEntryScalarWhereWithAggregatesInput | Prisma.TimeEntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.TimeEntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TimeEntryScalarWhereWithAggregatesInput | Prisma.TimeEntryScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"TimeEntry"> | number;
    date?: Prisma.DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string;
    project?: Prisma.StringWithAggregatesFilter<"TimeEntry"> | string;
    hours?: Prisma.FloatWithAggregatesFilter<"TimeEntry"> | number;
    description?: Prisma.StringWithAggregatesFilter<"TimeEntry"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TimeEntry"> | Date | string;
};
export type TimeEntryCreateInput = {
    date: Date | string;
    project: string;
    hours: number;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TimeEntryUncheckedCreateInput = {
    id?: number;
    date: Date | string;
    project: string;
    hours: number;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TimeEntryUpdateInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.StringFieldUpdateOperationsInput | string;
    hours?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TimeEntryUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.StringFieldUpdateOperationsInput | string;
    hours?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TimeEntryCreateManyInput = {
    id?: number;
    date: Date | string;
    project: string;
    hours: number;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TimeEntryUpdateManyMutationInput = {
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.StringFieldUpdateOperationsInput | string;
    hours?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TimeEntryUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.StringFieldUpdateOperationsInput | string;
    hours?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TimeEntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    project?: Prisma.SortOrder;
    hours?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TimeEntryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hours?: Prisma.SortOrder;
};
export type TimeEntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    project?: Prisma.SortOrder;
    hours?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TimeEntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    project?: Prisma.SortOrder;
    hours?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TimeEntrySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hours?: Prisma.SortOrder;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type TimeEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    date?: boolean;
    project?: boolean;
    hours?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["timeEntry"]>;
export type TimeEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    date?: boolean;
    project?: boolean;
    hours?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["timeEntry"]>;
export type TimeEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    date?: boolean;
    project?: boolean;
    hours?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["timeEntry"]>;
export type TimeEntrySelectScalar = {
    id?: boolean;
    date?: boolean;
    project?: boolean;
    hours?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TimeEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "date" | "project" | "hours" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["timeEntry"]>;
export type $TimeEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TimeEntry";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        date: Date;
        project: string;
        hours: number;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["timeEntry"]>;
    composites: {};
};
export type TimeEntryGetPayload<S extends boolean | null | undefined | TimeEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload, S>;
export type TimeEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TimeEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TimeEntryCountAggregateInputType | true;
};
export interface TimeEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TimeEntry'];
        meta: {
            name: 'TimeEntry';
        };
    };
    findUnique<T extends TimeEntryFindUniqueArgs>(args: Prisma.SelectSubset<T, TimeEntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TimeEntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TimeEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TimeEntryFindFirstArgs>(args?: Prisma.SelectSubset<T, TimeEntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TimeEntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TimeEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TimeEntryFindManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TimeEntryCreateArgs>(args: Prisma.SelectSubset<T, TimeEntryCreateArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TimeEntryCreateManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TimeEntryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TimeEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TimeEntryDeleteArgs>(args: Prisma.SelectSubset<T, TimeEntryDeleteArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TimeEntryUpdateArgs>(args: Prisma.SelectSubset<T, TimeEntryUpdateArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TimeEntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, TimeEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TimeEntryUpdateManyArgs>(args: Prisma.SelectSubset<T, TimeEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TimeEntryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TimeEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TimeEntryUpsertArgs>(args: Prisma.SelectSubset<T, TimeEntryUpsertArgs<ExtArgs>>): Prisma.Prisma__TimeEntryClient<runtime.Types.Result.GetResult<Prisma.$TimeEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TimeEntryCountArgs>(args?: Prisma.Subset<T, TimeEntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TimeEntryCountAggregateOutputType> : number>;
    aggregate<T extends TimeEntryAggregateArgs>(args: Prisma.Subset<T, TimeEntryAggregateArgs>): Prisma.PrismaPromise<GetTimeEntryAggregateType<T>>;
    groupBy<T extends TimeEntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TimeEntryGroupByArgs['orderBy'];
    } : {
        orderBy?: TimeEntryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TimeEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TimeEntryFieldRefs;
}
export interface Prisma__TimeEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TimeEntryFieldRefs {
    readonly id: Prisma.FieldRef<"TimeEntry", 'Int'>;
    readonly date: Prisma.FieldRef<"TimeEntry", 'DateTime'>;
    readonly project: Prisma.FieldRef<"TimeEntry", 'String'>;
    readonly hours: Prisma.FieldRef<"TimeEntry", 'Float'>;
    readonly description: Prisma.FieldRef<"TimeEntry", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TimeEntry", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TimeEntry", 'DateTime'>;
}
export type TimeEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeEntryScalarFieldEnum | Prisma.TimeEntryScalarFieldEnum[];
};
export type TimeEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeEntryScalarFieldEnum | Prisma.TimeEntryScalarFieldEnum[];
};
export type TimeEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    where?: Prisma.TimeEntryWhereInput;
    orderBy?: Prisma.TimeEntryOrderByWithRelationInput | Prisma.TimeEntryOrderByWithRelationInput[];
    cursor?: Prisma.TimeEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeEntryScalarFieldEnum | Prisma.TimeEntryScalarFieldEnum[];
};
export type TimeEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryCreateInput, Prisma.TimeEntryUncheckedCreateInput>;
};
export type TimeEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TimeEntryCreateManyInput | Prisma.TimeEntryCreateManyInput[];
};
export type TimeEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    data: Prisma.TimeEntryCreateManyInput | Prisma.TimeEntryCreateManyInput[];
};
export type TimeEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryUpdateInput, Prisma.TimeEntryUncheckedUpdateInput>;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TimeEntryUpdateManyMutationInput, Prisma.TimeEntryUncheckedUpdateManyInput>;
    where?: Prisma.TimeEntryWhereInput;
    limit?: number;
};
export type TimeEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeEntryUpdateManyMutationInput, Prisma.TimeEntryUncheckedUpdateManyInput>;
    where?: Prisma.TimeEntryWhereInput;
    limit?: number;
};
export type TimeEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeEntryCreateInput, Prisma.TimeEntryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TimeEntryUpdateInput, Prisma.TimeEntryUncheckedUpdateInput>;
};
export type TimeEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
    where: Prisma.TimeEntryWhereUniqueInput;
};
export type TimeEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeEntryWhereInput;
    limit?: number;
};
export type TimeEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeEntrySelect<ExtArgs> | null;
    omit?: Prisma.TimeEntryOmit<ExtArgs> | null;
};
export {};
