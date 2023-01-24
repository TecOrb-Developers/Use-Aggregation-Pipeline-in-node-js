import { StatusCodes } from "http-status-codes";
// import { Collection } from "mongoose";
import { resolve } from "path";

var Collection: any = [{
    "name": "Ashu",
    "class": "Eigth",
    "rollNo": 1,
    "marks": 10,
    "sports": ['Cricket', 'Football']
},
{
    "name": "Ashu",
    "class": "Eigth",
    "rollNo": 10,
    "marks": 10,
    "sports": ['Cricket', 'Hockey']
},
{
    "name": "Pankaj",
    "class": "Eigth",
    "rollNo": 11,
    "marks": 12

}, {
    "name": "Abhishek",
    "class": "Tenth",
    "rollNo": 12,
    "marks": 15

}]
var subjects = [{
    "name": "Ashu",
    "subjects": ['math', 'english', 'Physics']
}, {
    "name": "Pankaj",
    "subjects": ['math', 'english', 'Physics']
}, {
    "name": "Abhishek",
    "subjects": ['math', 'english', 'Physics']
}, {
    "name": "Ashu",
    "subjects": ['hindi', 'chemistry']
},
]

function useAggregationPipeline(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        Collection.aggregate([
            //add fields
            {
                $addFields: { "totalMarks": 20 }
            },
            //output:
            // [{
            // "name": "Ashu",
            // "class": "Eigth",
            // "rollNo": 1,
            // "marks": 10,
            //"sports": ['Cricket', 'Football']
            // "totalMarks": 20
            // },
            //     {
            //         "name": "Ashu",
            //         "class": "Eigth",
            //         "rollNo": 10,
            // "marks": 10,
            // "totalMarks": 20
            //     },
            // {
            //     "name": "Pankaj",
            //     "class": "Eigth",
            //     "rollNo": 11,
            // "marks": 12,
            //"sports": ['Cricket', 'Hockey']
            // "totalMarks": 20

            // }, {
            //     "name": "Abhishek",
            //     "class": "Tenth",
            //     "rollNo": 12,
            // "marks": 15,
            // "totalMarks": 20

            // }
            // ]

            //filter
            {
                $match: { name: "Ashu" }
            },
            //output:
            //[{
            //"name": "Ashu",
            //"class": "Eigth",
            //"rollNo": 1,
            //"marks": 10,
            //"sports": ['Cricket', 'Football']
            // },
            //{
            //"name": "Ashu",
            //"class": "Eigth",
            //"rollNo": 10,
            //"marks": 10,
            //"sports": ['Cricket', 'Hockey']
            //}
            // ]

            //using unwind
            {
                $unwind:
                    { path: "$sizes" }
            },
            //output:
            // [{
            // "name": "Ashu",
            // "class": "Eigth",
            // "rollNo": 1,
            //"marks": 10,
            //"sports": 'Cricket'
            // },
            // {
            // "name": "Ashu",
            // "class": "Eigth",
            // "rollNo": 1,
            //"marks": 10,
            //"sports": 'Football'
            // },
            //{
            //"name": "Ashu",
            //"class": "Eigth",
            //"rollNo": 10,
            //"marks": 10,
            //"sports": 'Cricket'
            //},
            //{
            //"name": "Ashu",
            //"class": "Eigth",
            //"rollNo": 10,
            //"marks": 10,
            //"sports": 'Hockey'
            //}
            // ]

            //lookup
            {
                $lookup: {
                    localfield: "name",
                    foreignfield: "name",
                    as: "details",
                    from: "subjects",
                    pipeline: [
                        {
                            $project: {
                                subjects: 1
                            }
                        }
                    ]
                }
            },
            //output:
            // [{
            // {
            // "name": "Ashu",
            // "rollNo": 1,
            // details: [
            //     {
            //         "subjects": ['math', 'english', 'Physics']
            //     },
            //     {
            //         "subjects": ['hindi', 'chemistry']
            //     }
            // ]
            // },
            // {
            // "name": "Ashu",
            // "rollNo": 10,
            // details: [
            //     {
            //         "subjects": ['math', 'english', 'Physics']
            //     },
            //     {
            //         "subjects": ['hindi', 'chemistry']
            //     }
            // ]
            // }
            // ]
            //use $project
            {
                $project: {
                    'name': 1, "rollNo": 1
                }
            },
            //output:
            // [{
            // "name": "Ashu",
            // "rollNo": 1
            // },
            //     {
            //         "name": "Ashu",
            //         "rollNo": 10
            //     }
            // ]

            // Group remaining documents by keyname 
            {
                $group: { _id: "$name" }
            },
            //output:
            // [{
            // _id:"Ashu",
            // [
            // {
            // "name": "Ashu",
            // "rollNo": 1
            // },
            // {
            // "name": "Ashu",
            // "rollNo": 10
            // }
            // ]
            // }
            // ]

            // Sort documents by keyname in descending order
            {
                $sort: { rollNo: 1 }
            },
            // output:
            // [
            // {
            // "name": "Ashu",
            // "rollNo": 1
            // },
            // {
            // "name": "Ashu",
            // "rollNo": 10
            // }
            // ]

            //skip document
            { $skip: 1 },
            // output:
            // [
            // {
            // "name": "Ashu",
            // "rollNo": 10
            // }
            // ]
            //limit document
            { $limit: 1 }
            // output:[
            // {
            // "name": "Ashu",
            // "rollNo": 1
            // }
            // ]

        ])
    })
}


export default {
    useAggregationPipeline
} as const;